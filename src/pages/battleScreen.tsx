import PotionContainer from "../components/PotionContainer";
import { Potion } from "../interfaces/Potion";

interface BattleScreenProps {
  potions: Potion[];
}

const BattleScreen: React.FC<BattleScreenProps> = ({
  potions,
}) => {


  return (
    <div className='w-full fixed flex items-center justify-center'>
      <PotionContainer
        potions={potions}
      />
    </div>
  );
};

export default BattleScreen;