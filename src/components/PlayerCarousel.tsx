import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import socket from '../sockets/socket';
import { Player } from '../interfaces/Player';

interface PlayerCarouselProps {
  setSelectedPlayer: (player: Player) => void;
  selectedPlayer: Player;
  displayedPlayers: Player[];
}

const PlayerCarousel: React.FC<PlayerCarouselProps> = ({setSelectedPlayer, displayedPlayers, selectedPlayer}) => {

  // We extend with placeholders at the beginning and end to keep the first and last elements centered
  const extendedPlayers = [
    { _id: 'placeholder', name: '', avatar: '' },
    ...displayedPlayers,
    { _id: 'placeholder', name: '', avatar: '' },
  ];

  // valid indices
  const MIN_SELECTABLE = 1;
  const MAX_SELECTABLE = extendedPlayers.length - 2;

  // State to know which card is selected
  const [selectedIndex, setSelectedIndex] = useState(MIN_SELECTABLE);

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
  },
  [containerWidth, cardWidth, GAP, maxDrag, x]);

  // When selectedIndex changes => center
  useEffect(() => {
    centerOnIndex(selectedIndex);
    setSelectedPlayer(displayedPlayers[selectedIndex-1]);
  }, [selectedIndex, centerOnIndex, displayedPlayers, setSelectedPlayer]);

  useEffect(() => {
    if (selectedPlayer) {
      socket.emit('mobile-setSelectPlayer', selectedPlayer._id);
    }
  }, [selectedPlayer]);

  // When the displayed players data changes recalculate the selected index.
  useEffect(() => {
    if (displayedPlayers.length===0) {return;}
    const maxPossibleIndex = displayedPlayers.length;
    const newIndex = Math.min(maxPossibleIndex, selectedIndex);
    setSelectedIndex(newIndex);
  }, [displayedPlayers, selectedIndex]);

  const handleDragEnd = (_: any, info: any) => {
    if (!cardWidth) return;

    const offsetX = info.offset.x;
    const threshold = 50;

    let newIndex = selectedIndex;

    // threshold to the left => next
    if (offsetX < -threshold) {
      newIndex = selectedIndex + 1;
    }
    // threshold to the right => previous
    else if (offsetX > threshold) {
      newIndex = selectedIndex - 1;
    }

    // Prevent passing beyond placeholders
    if (newIndex < MIN_SELECTABLE) newIndex = MIN_SELECTABLE;
    if (newIndex > MAX_SELECTABLE) newIndex = MAX_SELECTABLE;

    if (newIndex !== selectedIndex) {
      setSelectedIndex(newIndex);
    } else {
      centerOnIndex(selectedIndex);
    }
  };

  // We calculate a height based on cardWidth and the aspect ratio
  const cardHeight = cardWidth * ASPECT_RATIO;

  return (
    <div
      ref={containerRef}
      className="flex items-center overflow-hidden w-[80vw]"
      style={{ height: cardHeight + 100 }}
      // We leave extra space for the top/bottom
    >
      <motion.div
        className="flex gap-4"
        style={{ x }}
        drag="x"
        onDragEnd={handleDragEnd}
      >
        {extendedPlayers.map((player, index) => {
          const isActive = index === selectedIndex;
     
          return (
            <motion.div
              key={index}
              className="relative flex-shrink-0 overflow-hidden"
              style={{
                width: cardWidth,
                height: cardHeight,
              }}
              animate={{
                transform: isActive
                  ? 'translate(0px, -15px) scale(1.15)'
                  : 'translate(0px, 30px) scale(0.90)',
                filter: isActive
                  ? 'saturate(1) blur(0px) drop-shadow(0px 6px 8px rgba(92, 22, 17, .5)) drop-shadow(0px 6px 15px rgba(255, 255, 255, .15))'
                  : 'saturate(0.5) blur(2px)',
                opacity: isActive ? 1 : 0.75, 
                
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* We do not render content for placeholders */}
              {player._id !== 'placeholder' && (
                <>
                  <img
                    src="/images/carousel-frame.webp"
                    className="absolute z-10 w-full h-full"
                  />
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-full absolute top-1/2 -translate-y-[42%] z-0"
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 89% 30%, 89% 100%, 70% 100%, 30% 100%, 9% 100%, 10% 31%)',
                    }}
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