import React from 'react';
import { Potion } from '../interfaces/Potion';

interface PotionCardProps {
  potion: Potion;
  onClick: (potion: Potion) => void
}

const PotionCard: React.FC<PotionCardProps> = ({
  potion, onClick
}) => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={`/images/${potion.image}`}
          alt={potion.name}
          className="w-[70%] mb-1 h-auto object-contain"
          onClick={() => onClick(potion)}
        />
      </div>
    </>
  );
};

export default PotionCard;
