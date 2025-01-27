import { useState } from "react";
import { Potion } from "../interfaces/Potion";
import SelectOponentModal from "../components/SelectOponentModal";
import Actions from "../components/Actions";
import NickName from "../components/NickName";
import ClassImage from "../components/ClassImage"; // Import the new component

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
        <ClassImage />

        <NickName />

        <Actions potions={potions} openModal={openModal} />
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