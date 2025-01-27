import {useState } from "react";
import { Potion } from "../interfaces/Potion";
import SelectOponentModal from "../components/SelectOponentModal";
import Actions from "../components/Actions";
import NickName from "../components/NickName";
import ClassImage from "../components/ClassImage"; // Import the new component
import socket from "../sockets/socket";
import PlayerInterface from "../interfaces/PlayerInterface";

interface BattleScreenProps {
  potions: Potion[];
  player: PlayerInterface | null;
}

const BattleScreen: React.FC<BattleScreenProps> = ({
  potions, player
}) => {
  //remove this log when sockect is used for the first time
  console.log(socket);

  
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
        style={{ backgroundImage: 'url(/images/BattleFrame.png)', backgroundSize: '100% 100%' }}>
        <ClassImage />

        <NickName nickname={player?.nickname!}/>

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