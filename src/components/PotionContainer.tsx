import React from 'react';
import { Potion } from '../interfaces/Potion';
import PotionCard from './Potion';

interface PotionContainerProps {
  potions: Potion[];
  onClick: (potion: Potion) => void
}

const PotionContainer: React.FC<PotionContainerProps> = ({
  potions,
  onClick
}) => {

  const importedPotions = potions;
  const filteredPotions = importedPotions;

  const PotionsPerRow = filteredPotions.length;
  const startIndex = 0;
  const potionsToDisplay = filteredPotions.slice(startIndex, PotionsPerRow);

  return (
    <div
      hidden={true}
      className='flex-row w-full rounded-3xl flex items-center justify-center' 
      data-testid="potion-container">
      {potionsToDisplay.length > 0 ? (
        <div className="w-[75%] flex flex-row">
          {potionsToDisplay.map((potion: Potion, potionIndex) => (
            <div
              key={potionIndex}
              className="relative w-[33%] max-w-[200px] m-2 aspect-square" // Controla el tamaño y mantiene proporciones cuadradas
              style={{
                backgroundImage: 'url(/images/potion-container.webp)',
                backgroundSize: 'cover', // La imagen de fondo se ajusta sin deformarse
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >

              <PotionCard
                potion={potion}
                onClick={onClick}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No potions available.</p>
      )}
    </div>
  );
};

export default PotionContainer;