import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { playersMock } from "../mocks/PlayersMock";

// We extend with placeholders at the beginning and end
const extendedPlayers = [
  { id: "placeholder-start", placeholder: true, name: "", avatar: "" },
  ...playersMock,
  { id: "placeholder-end", placeholder: true, name: "", avatar: "" },
];

// valid indices
const MIN_SELECTABLE = 1;
const MAX_SELECTABLE = extendedPlayers.length - 2;

export default function DraggableCarousel() {
  // State to know which card is selected
  const [selectedIndex, setSelectedIndex] = useState(MIN_SELECTABLE);
  // We use a MotionValue for x
  const x = useMotionValue(0);

  // Reference to the container
  const containerRef = useRef<HTMLDivElement>(null);
  // We store its width
  const [containerWidth, setContainerWidth] = useState(0);

  // Additionally, we store the dynamic width of the cards.
  // For example, each card takes up 60% of the container.
  const [cardWidth, setCardWidth] = useState(0);

  // Aspect ratio between height and width.
  // Originally it was 255 (height) / 200 (width) = 1.275
  const ASPECT_RATIO = 1.275;

  // Gap between each card
  const GAP = 16;

  // Total number of cards
  const totalCards = extendedPlayers.length;

  useEffect(() => {
    function handleResize() {
      if (!containerRef.current) return;
      const newContainerWidth = containerRef.current.offsetWidth;
      setContainerWidth(newContainerWidth);
      // Adjust the factor here if you want it to be larger or smaller.
      // For example, 0.6 => 60% of the container
      setCardWidth(newContainerWidth * 0.5);
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on mount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Recalculates the "maximum" position we can drag
  // based on the calculated cardWidth.
  const maxDrag = Math.max(
    totalCards * (cardWidth + GAP) - GAP - containerWidth,
    0
  );

  // Function to center the card at the given index
  const centerOnIndex = useCallback(
    (index: number) => {
      if (!containerWidth || !cardWidth) return;

      // targetOffset: the position that brings the card to the center
      const targetOffset =
        -(index * (cardWidth + GAP)) + containerWidth / 2 - cardWidth / 2;
      const clamped = Math.max(Math.min(targetOffset, 0), -maxDrag);

      animate(x, clamped, {
        type: "spring",
        stiffness: 300,
        damping: 25,
      });
    },
    [containerWidth, cardWidth, GAP, maxDrag, x]
  );

  // When selectedIndex changes => center
  useEffect(() => {
    centerOnIndex(selectedIndex);
  }, [selectedIndex, centerOnIndex]);

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
      className="flex items-center overflow-hidden w-[80vw] mx-autorelativ"
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
              key={player.id}
              className="relative flex-shrink-0 shadow-lg overflow-hidden"
              style={{
                width: cardWidth,
                height: cardHeight,
              }}
              animate={{
                transform: isActive
                  ? "translate(0px, -25px) scale(1.15)"
                  : "translate(0px, 20px) scale(0.90)",
                filter: isActive
                    ? `saturate(1) blur(0px) drop-shadow(10px 6px 4px rgba(92, 22, 17, .5))`
                    : `saturate(0.5) blur(2px)`,
                opacity: isActive ? 1 : 0.75, 
                
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* We do not render content for placeholders */}
              {!player.placeholder && (
                <>
                  <img
                    src="/images/carousel-frame.png"
                    className="absolute z-10 w-full h-full "
                  />
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-full absolute top-1/2 -translate-y-[40%] z-0"
                    style={{
                      clipPath: "polygon(30% 0%, 70% 0%, 89% 30%, 89% 100%, 70% 100%, 30% 100%, 9% 100%, 10% 31%)",
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
}
