import React from 'react';
import { Factions } from '../interfaces/Factions';

interface CarouselFilterButtonProps {
  faction: Factions;
  selected: boolean;
  onClick: () => void
} 

const CarouselFilterButton: React.FC<CarouselFilterButtonProps> = ({faction, selected, onClick}) => {

  if (!['KAOTIKA', 'DRAVOCAR'].includes(faction)) return;

  const buttonBackground = faction === 'DRAVOCAR' 
    ? 'url(/images/filter-button-dravocar.webp)' 
    : 'url(/images/filter-button-kaotika.webp)';

  return (
    <button
      className={`w-[94%] h-[12vw]${selected ? 'animate-saturation' : ''}`}
      style={{
        backgroundImage: buttonBackground,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        filter: selected ? 'saturate(1)' : 'saturate(0)'
      }}
      onClick={onClick}
    >
    </button>
  );
};

export default CarouselFilterButton;