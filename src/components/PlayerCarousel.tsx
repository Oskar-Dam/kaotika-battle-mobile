import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { playersMock } from "../mocks/PlayersMock";

/**
 * Carrusel para selección de jugadores, desplazándose de a uno.
 * - Mantenemos placeholders al inicio y final para centrar primer y último jugador.
 * - Mantenemos 3 cartas a la vista (central + adyacentes).
 * - Al hacer drag y soltar, avanza o retrocede sólo un card.
 */

// Dimensiones
const CARD_WIDTH = 120;
const GAP = 32;

// Extendemos el array para placeholders
const extendedPlayers = [
  { id: "placeholder-start", name: "", avatar: "", placeholder: true },
  ...playersMock,
  { id: "placeholder-end", name: "", avatar: "", placeholder: true },
];

export default function DraggableCarousel() {
  // Empezamos centrado en el primer jugador real => índice 1.
  const [selectedIndex, setSelectedIndex] = useState(1);
  const x = useMotionValue(0);

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const totalCards = extendedPlayers.length;
  const totalContentWidth = totalCards * (CARD_WIDTH + GAP) - GAP;

  // Calculamos el ancho del contenedor
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Ajustamos límites de arrastre
  const maxDrag = Math.max(totalContentWidth - containerWidth, 0);
  const dragConstraints = { left: -maxDrag, right: 0 };

  // Cada vez que cambie el selectedIndex, centramos la carta correspondiente
  useEffect(() => {
    if (!containerWidth) return;

    // Cálculo para centrar la carta en selectedIndex
    const targetOffset = -(selectedIndex * (CARD_WIDTH + GAP))
      + containerWidth / 2
      - CARD_WIDTH / 2;

    const clamped = Math.max(Math.min(targetOffset, 0), -maxDrag);
    x.set(clamped);
  }, [containerWidth, selectedIndex, x, maxDrag]);

  // Al soltar, avanza o retrocede solo 1 card según la dirección del drag
  const handleDragEnd = (_, info) => {
    const offsetX = info.offset.x;
    let newIndex = selectedIndex;

    // Si se arrastra hacia la izquierda (> 50 px), avanzamos al siguiente
    if (offsetX < -50) {
      newIndex = Math.min(selectedIndex + 1, totalCards - 1);
    }
    // Si se arrastra hacia la derecha (> 50 px), retrocedemos al anterior
    else if (offsetX > 50) {
      newIndex = Math.max(selectedIndex - 1, 0);
    }

    setSelectedIndex(newIndex);
  };

  return (
    <div
      ref={containerRef}
      className="overflow-hidden w-[80vw] h-[300px] mx-auto bg-gray-200 border border-blue-500 relative"
    >
      <motion.div
        className="flex gap-8 px-4 py-4"
        style={{ x }}
        drag="x"
        dragConstraints={dragConstraints}
        onDragEnd={handleDragEnd}
      >
        {extendedPlayers.map((player, index) => {
          const isActive = index === selectedIndex;
          // Solo 3 cartas visibles: la seleccionada y las adyacentes
          const isVisible = index >= selectedIndex - 1 && index <= selectedIndex + 1;

          if (!isVisible) {
            return <React.Fragment key={player.id} />;
          }

          return (
            <motion.div
              key={player.id}
              className="relative flex-shrink-0 w-[120px] h-[170px] border-2 border-white shadow-lg overflow-hidden"
              animate={{ scale: isActive ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Sólo mostramos imagen si no es placeholder */}
              {!player.placeholder && (
                <>
                  <img
                    src="/images/carousel-frame.png"
                    className="absolute top-0 left-0 z-10 w-full h-full"
                  />
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-full absolute top-1/2 -translate-y-[40%] z-0"
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
