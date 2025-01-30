import { useState, useEffect } from "react";
import { Potion } from "../interfaces/Potion";
import Actions from "../components/Actions";
import CarouselContainer from "../components/CarouselContainer";
import socket from "../sockets/socket";
import PlayerInterface from "../interfaces/PlayerInterface";
import Waiting from "../components/Waiting";
import PotionModal from "../components/PotionModal";
import BlockedScreen from "../components/BlockedScreen";
import Avatar from "../components/Avatar";
import NickName from "../components/NickName";
import StaminaBar from "../components/StaminaBar";
import HitPointsBar from "../components/HitPointsBar";
import { Factions } from "../interfaces/Factions";
interface BattleScreenProps {
  potions: Potion[];
  player: PlayerInterface | null;
  setAllPlayers: React.Dispatch<React.SetStateAction<PlayerInterface[]>>;
  isMyTurn: boolean;
  setIsMyTurn: React.Dispatch<React.SetStateAction<boolean>>;
}

const BattleScreen: React.FC<BattleScreenProps> = ({
  potions, 
  player,
  setAllPlayers,
  isMyTurn,
  setIsMyTurn
}) => {

  setIsMyTurn;
  //remove this log when sockect is used for the first time
  console.log(socket);

  const [selectedPotion, setSelectedPotion] = useState<Potion | null>(null);
  const [showWaitingScreen, setShowWaitingScreen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(undefined);
  const [filteredFaction, setFilteredFaction] = useState<Factions|undefined>(undefined);

  setShowWaitingScreen;

  useEffect(() => {
    socket.on("assign-turn", (_id: string) => {
      if (player?._id === _id) {
        setIsMyTurn(true);
      } else {
        setIsMyTurn(false);
      }
    });

    return () => {
      socket.off("assign-turn");
    };
  }, [player, setIsMyTurn]);

  const openModal = (potion: Potion) => {
    setSelectedPotion(potion);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const frameBackground = player?.isBetrayer ? 'url(/images/frame-betrayer.webp)' : 'url(/images/frame-loyal.webp)';

  return (
    <>
      {!isMyTurn && <BlockedScreen />}
      {showWaitingScreen && <Waiting setAllPlayers={setAllPlayers} setShowWaitingScreen={setShowWaitingScreen}/>}

      {/* MAIN FRAME */}
      <div  
        className='w-screen h-screen flex flex-col items-center justify-center top-0 z-20'
        style={{ backgroundImage: frameBackground, backgroundSize: '100% 100%' }}
      >
        <StaminaBar/>
        <HitPointsBar/>

        {/* AVATAR */}
        <Avatar avatar={player?.avatar}/>

        {/* CAROUSEL CONTAINER */}
        <CarouselContainer
           setSelectedPlayer={setSelectedPlayer}
           filteredFaction={filteredFaction}
           setFilteredFaction={setFilteredFaction}
        />
        
        {/* SELECTED PLAYER NICK */}
        <NickName nickname={selectedPlayer?.nickname} />
        
        {/* ACTION BUTTONS */}
        <Actions potions={potions} openModal={openModal} isMyTurn={isMyTurn} setIsMyTurn={setIsMyTurn}/>

      </div>



      {isModalOpen && selectedPotion && (
        <PotionModal
          potion={selectedPotion}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default BattleScreen;