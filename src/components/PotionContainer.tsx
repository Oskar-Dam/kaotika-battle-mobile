import { Potion } from '../interfaces/Potion';
import PotionCard from './Potion';

interface PotionContainerProps {
  potions: Potion[];
}

const PotionContainer: React.FC<PotionContainerProps> = ({
  potions,
}) => {
  const filteredPotions = potions

  const PotionsPerRow = filteredPotions.length;
  const startIndex = 0;
  const potionsToDisplay = filteredPotions.slice(startIndex, PotionsPerRow);

  return (
    <div className='flex-row w-full rounded-3xl flex items-center justify-center'>
      {potionsToDisplay.length > 0 ? (
        <div className="w-[75%] flex flex-row">
          {potionsToDisplay.map((potion: Potion, potionIndex) => (
            <div key={potionIndex} className="w-[33%] break-normal md:break-all">
              <PotionCard
                potion={potion}
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