import { useState } from "react";
import { Potion } from "../interfaces/Potion";
import Actions from "../components/Actions";
import CarouselContainer from "../components/CarouselContainer";
import socket from "../sockets/socket";
import PlayerInterface from "../interfaces/PlayerInterface";
import Waiting from "../components/Waiting";
import PotionModal from "../components/PotionModal";
import Avatar from "../components/Avatar";

interface BattleScreenProps {
  potions: Potion[];
  player: PlayerInterface | null;
  setAllPlayers: React.Dispatch<React.SetStateAction<PlayerInterface[]>>;
}

const BattleScreen: React.FC<BattleScreenProps> = ({
  potions, player,setAllPlayers
}) => {
  //remove this log when sockect is used for the first time
  console.log(socket);

  const [selectedPotion, setSelectedPotion] = useState<Potion | null>(null);
  const [showWaitingScreen, setShowWaitingScreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  setShowWaitingScreen;

  const openModal = (potion: Potion) => {
    setSelectedPotion(potion);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const frameBackground = player?.isBetrayer ? 'url(/images/frame_betrayer.png)' : 'url(/images/frame_loyal.png)';

  return (
    <>
    {showWaitingScreen && <Waiting setAllPlayers={setAllPlayers} />}

      {/* MAIN FRAME */}
      <div  
        className='w-full h-screen flex flex-col items-center justify-center top-0'
        style={{ backgroundImage: frameBackground, backgroundSize: '100% 100%' }}
      >

        {/* AVATAR */}
        <Avatar avatar={player?.avatar}/>

        {/* CAROUSEL CONTAINER */}
        <CarouselContainer/>

        {/* ACTION BUTTONS */}
        <Actions potions={potions} openModal={openModal}/>

      </div>

      {isModalOpen && selectedPotion && (
        <PotionModal
          potion={selectedPotion}
          closeModal={closeModal}
        />
      )
      }
    </>
  );
};

export default BattleScreen;