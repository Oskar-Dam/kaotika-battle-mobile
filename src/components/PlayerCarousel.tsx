import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, animate, PanInfo } from 'framer-motion';
import socket from '../sockets/socket';
import { Player } from '../interfaces/Player';

interface PlayerCarouselProps {
  setSelectedPlayer: (player: Player) => void;
  selectedPlayer: Player;
  displayedPlayers: Player[];
  externalSelectedIndex: number;
  setSelectedPlayerIndex: (index: number) => void;
}

const PlayerCarousel: React.FC<PlayerCarouselProps> = ({ setSelectedPlayer, displayedPlayers, selectedPlayer, externalSelectedIndex, setSelectedPlayerIndex}) => {

  // We extend with placeholders at the beginning and end to keep the first and last elements centered
  const extendedPlayers = [
    { _id: 'placeholder', name: '', avatar: '', isBetrayer: undefined, attributes: undefined, base_attributes: undefined },
    ...displayedPlayers,
    { _id: 'placeholder', name: '', avatar: '', isBetrayer: undefined, attributes: undefined, base_attributes: undefined },
  ];

  // valid indices
  const MIN_SELECTABLE = 1;
  const MAX_SELECTABLE = extendedPlayers.length - 2;

  // State to know which card is selected

  useEffect(() => {
    if (externalSelectedIndex !== undefined) {
      const clampedIndex = Math.min(Math.max(externalSelectedIndex, MIN_SELECTABLE), MAX_SELECTABLE);
      setSelectedPlayerIndex(clampedIndex);
    }
  }, [externalSelectedIndex]);

  // We use a MotionValue for x
  const x = useMotionValue(0);

  // Reference to the container
  const containerRef = useRef<HTMLDivElement>(null);

  // We store the containers width
  const [containerWidth, setContainerWidth] = useState(0);

  // The width of the cards.
  const [cardWidth, setCardWidth] = useState(0);

  // Aspect ratio between height and width.
  const ASPECT_RATIO = 1.275;

  // Gap between each card
  const GAP = 16;

  // Total number of cards
  const totalCards = extendedPlayers.length;

  useEffect(() => {

    const handleResize = () => {
      if (!containerRef.current) return;
      const newContainerWidth = containerRef.current.offsetWidth;
      setContainerWidth(newContainerWidth);
      // Adjust the factor here if you want it to be larger or smaller.
      // For example, 0.5 => 50% of the container
      setCardWidth(newContainerWidth * 0.5);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on mount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Recalculates the "maximum" position we can drag based on the calculated cardWidth.
  const maxDrag = Math.max(totalCards * (cardWidth + GAP) - GAP - containerWidth,
    0);

  // Function to center the card at the given index
  const centerOnIndex = useCallback((index: number) => {
    if (!containerWidth || !cardWidth) return;

    // targetOffset: the position that brings the card to the center
    const targetOffset = -(index * (cardWidth + GAP)) + containerWidth / 2 - cardWidth / 2;
    const clamped = Math.max(Math.min(targetOffset, 0), -maxDrag);

    animate(x, clamped, {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    });
  }, [containerWidth, cardWidth, GAP, maxDrag, x]);

  // When externalSelectedIndex changes => center
  useEffect(() => {
    console.log('externalSelectedIndex: ', externalSelectedIndex);
    
    centerOnIndex(externalSelectedIndex);
    setSelectedPlayer(displayedPlayers[externalSelectedIndex - 1]);
  }, [externalSelectedIndex, centerOnIndex, displayedPlayers, setSelectedPlayer]);

  useEffect(() => {
    if (selectedPlayer) {
      console.log('Selected player: ', selectedPlayer.nickname);
      console.log('Selected player is betrayer? ', selectedPlayer.isBetrayer);
      console.log('Array of DISPLAYED players: ', displayedPlayers);
      console.log('Array of EXTENDED players: ', extendedPlayers);
      
      
      
      console.log('mobile-setSelectedPlayer SENT: ', selectedPlayer._id);
      socket.emit('mobile-setSelectedPlayer', selectedPlayer._id);
    }
  }, [selectedPlayer]);

  // When the displayed players data changes recalculate the selected index.
  useEffect(() => {
    if (displayedPlayers.length === 0) { return; }
    const maxPossibleIndex = displayedPlayers.length;
    const newIndex = Math.min(maxPossibleIndex, externalSelectedIndex);
    setSelectedPlayerIndex(newIndex);
  }, [displayedPlayers, externalSelectedIndex]);

  const handleDragEnd = (_: MouseEvent | TouchEvent, info: PanInfo) => {
    if (!cardWidth) return;

    const offsetX = info.offset.x;
    const threshold = 50;

    let newIndex = externalSelectedIndex;

    // threshold to the left => next
    if (offsetX < -threshold) {
      newIndex = externalSelectedIndex + 1;
    }
    // threshold to the right => previous
    else if (offsetX > threshold) {
      newIndex = externalSelectedIndex - 1;
    }

    // Prevent passing beyond placeholders
    if (newIndex < MIN_SELECTABLE) newIndex = MIN_SELECTABLE;
    if (newIndex > MAX_SELECTABLE) newIndex = MAX_SELECTABLE;

    if (newIndex !== externalSelectedIndex) {
      setSelectedPlayerIndex(newIndex);
    } else {
      centerOnIndex(externalSelectedIndex);
    }
  };

  // We calculate a height based on cardWidth and the aspect ratio
  const cardHeight = cardWidth * ASPECT_RATIO;

  return (
    <div
      ref={containerRef}
      className="flex items-center overflow-hidden w-[80vw]"
      style={{ height: cardHeight + 100 }}>
      <motion.div
        className="flex gap-4"
        style={{ x }}
        drag="x"
        onDragEnd={handleDragEnd}>
        {extendedPlayers.map((player, index) => {
          const isActive = index === externalSelectedIndex;
          const frameSrc = player?.isBetrayer ? '/images/carousel-red-frame.webp' : '/images/carousel-blue-frame.webp';
          const fallbackAvatar = player?.isBetrayer
            ? '/images/too_many_request_betrayer.webp'
            : '/images/too_many_request_loyal.webp';
          const actualPercent = (player?.attributes?.hit_points ?? 0) / (player?.base_attributes?.hit_points ?? 1) * 100;
          return (
            <motion.div
              key={index}
              className="relative flex-shrink-0 overflow-hidden"
              style={{ width: cardWidth, height: cardHeight }}
              animate={{
                transform: isActive ? 'translate(0px, -15px) scale(1.15)' : 'translate(0px, 30px) scale(0.90)',
                filter: isActive
                  ? 'saturate(1) blur(0px) drop-shadow(0px 6px 8px rgba(92, 22, 17, .5)) drop-shadow(0px 6px 15px rgba(255, 255, 255, .15))'
                  : 'saturate(0.5) blur(2px)',
                opacity: isActive ? 1 : 0.75,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {player._id !== 'placeholder' && (
                <>
                  <img
                    src={frameSrc}
                    className="absolute z-10 w-full h-full"
                  />
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-full absolute top-1/2 -translate-y-[42%] z-0"
                    style={{
                      clipPath:
                        'polygon(30% 0%, 70% 0%, 89% 30%, 89% 100%, 70% 100%, 30% 100%, 9% 100%, 10% 31%)',
                    }}
                    onError={(e) => (e.currentTarget.src = fallbackAvatar)}
                  />
                  <img
                    style={{ maskImage: `linear-gradient(to right, white ${actualPercent}%, transparent ${actualPercent + 10}%)` }}
                    src="/images/carousel-hp-bar.webp"
                    alt="?"
                    className="w-[75%] left-5 absolute bottom-5 z-1"
                  />
                  <img
                    src="/images/carousel-bg-hp-bar.webp"
                    alt="?"
                    className="w-[75%] left-5 absolute bottom-5 z-0"
                  />
                </>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default PlayerCarousel;