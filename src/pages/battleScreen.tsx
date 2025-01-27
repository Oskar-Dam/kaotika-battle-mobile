import { useState } from "react";
import AttackButton from "../components/AttackButton";
import PotionContainer from "../components/PotionContainer";
import { Potion } from "../interfaces/Potion";
import SelectOponentModal from "../components/SelectOponentModal";
import Actions from "../components/Actions";
import NickName from "../components/NickName";

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
      <div
        className='w-full h-screen flex flex-col items-center justify-center'
        style={{ backgroundImage: 'url(/images/LoginBackground.png)', backgroundSize: 'cover' }}>
        <div className="flex justify-center w-full h-[49%] border-2 border-blue-500">
          {/* Contenido del primer componente */}
        </div>

        <NickName />

        <Actions potions={potions} openModal={openModal}/>
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