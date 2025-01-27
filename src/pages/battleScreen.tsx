import { useState } from "react";
import AttackButton from "../components/AttackButton";
import PotionContainer from "../components/PotionContainer";
import { Potion } from "../interfaces/Potion";
import SelectOponentModal from "../components/SelectOponentModal";

interface BattleScreenProps {
  potions: Potion[];
}

const BattleScreen: React.FC<BattleScreenProps> = ({
  potions,
}) => {
   
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };

  return (
    <>
      <div className='w-full flex flex-col items-center justify-center'>
        <AttackButton
          text={'Attack'}
          onClick={openModal}
        />
        <div className='w-full flex items-center justify-center m-[10%]'>
          <PotionContainer
            potions={potions}
          />
        </div>

      </div>
      {isModalOpen && (
        <SelectOponentModal
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default BattleScreen;