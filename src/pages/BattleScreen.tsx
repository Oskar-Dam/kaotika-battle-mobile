import { useEffect, useState } from 'react';
import Actions from '../components/Actions';
import Avatar from '../components/Avatar';
import BlockedScreen from '../components/BlockedScreen';
import CarouselContainer from '../components/CarouselContainer';
import HitPointsBar from '../components/HitPointsBar';
import NickName from '../components/NickName';
import PotionModal from '../components/PotionModal';
import StaminaBar from '../components/StaminaBar';
import Waiting from '../components/Waiting';
import { Factions } from '../interfaces/Factions';
import { Player } from '../interfaces/Player';
import GameEndingModal from '../components/GameEndingModal';

import { Potion } from '../interfaces/Potion';
import { clearListenToServerEventsBattleScreen, listenToChangeTurn, listenToGameEnded, listenToRemovePlayer, listenToUpdatePlayer } from '../sockets/socketListeners';
import DeadScreen from './DeadScreen';
interface BattleScreenProps {
  potions: Potion[];
  player: Player;
  setPlayer:React.Dispatch<React.SetStateAction<Player | null>>;
  isMyTurn: boolean;
  setIsMyTurn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setEmail: (email: string) => void;
}

const BattleScreen: React.FC<BattleScreenProps> = ({
  potions, player, isMyTurn, setIsMyTurn, setPlayer, setIsLoggedIn, setEmail
}) => {

  const [selectedPotion, setSelectedPotion] = useState<Potion | null>(null);
  const [showWaitingScreen, setShowWaitingScreen] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();
  const [filteredFaction, setFilteredFaction] = useState<Factions|undefined>(player.isBetrayer ? 'KAOTIKA' : 'DRAVOCAR');
  const [kaotikaPlayers, setKaotikaPlayers] = useState<Player[]>([]);
  const [dravocarPlayers, setDravocarPlayers] = useState<Player[]>([]);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>('Kaotika');
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number>(1);
  const [userDead, setUserDead] = useState<boolean>(false);

  // ⬇️ SETTERS CALLED HERE FOR ESLINT TO IGNORE NOT CALLING THEM, DELETE AFTER SOCKET IMPLEMENTATION⬇️ //
  setGameEnded;
  setWinner;

  const factionsSetters = {
    'kaotika': setKaotikaPlayers,
    'dravocar': setDravocarPlayers
  };

  useEffect(() => {

    listenToUpdatePlayer(factionsSetters, setPlayer, player);
    listenToRemovePlayer(setKaotikaPlayers, setDravocarPlayers, kaotikaPlayers, dravocarPlayers, setUserDead, player);
    listenToChangeTurn(setIsMyTurn, player, kaotikaPlayers, dravocarPlayers, setSelectedPlayerIndex);
    listenToGameEnded(setGameEnded, setWinner); 

    console.log('KAOTIKA PLAYERS: ', kaotikaPlayers);
    console.log('DRAVOCAR PLAYERS: ', dravocarPlayers);
    
    return () => {
      clearListenToServerEventsBattleScreen();
    };
  }, [kaotikaPlayers, dravocarPlayers, player]);


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
      {!isMyTurn && !userDead && <BlockedScreen />}
      {userDead && <DeadScreen/>}

      {showWaitingScreen && (
        <Waiting 
          role={player.role}
          setDravocarPlayers={setDravocarPlayers}
          setKaotikaPlayers={setKaotikaPlayers}
          setShowWaitingScreen={setShowWaitingScreen}
        />)
      }

      {/* MAIN FRAME */}
      <div
        className='w-screen h-screen flex flex-col items-center justify-center top-0 z-20'
        style={{ backgroundImage: frameBackground, backgroundSize: '100% 100%' }}
      >
        <StaminaBar
          resistance={player.attributes.resistance ?? 0}
          base_resistance={player.base_attributes.resistance ?? 0}
        />
        <HitPointsBar
          hp={player.attributes.hit_points ?? 0}
          base_hp={player.base_attributes.hit_points ?? 0}
        />

        {/* AVATAR */}
        <Avatar
          avatar={player.avatar}
          faction={player.isBetrayer}/>

        {/* CAROUSEL CONTAINER */}
        <CarouselContainer
          setSelectedPlayer={setSelectedPlayer}
          filteredFaction={filteredFaction}
          setFilteredFaction={setFilteredFaction}
          kaotikaPlayers={kaotikaPlayers}
          dravocarPlayers={dravocarPlayers}
          selectedPlayer={selectedPlayer!}
          player={player}
          selectedPlayerIndex={selectedPlayerIndex}
          setSelectedPlayerIndex={setSelectedPlayerIndex}
        />
        
        {/* SELECTED PLAYER NICK */}
        <NickName nickname={selectedPlayer?.nickname} />

        {/* ACTION BUTTONS */}
        <Actions
          selectedPlayer={selectedPlayer}
          player={player}
          potions={potions}
          openModal={openModal}
          isMyTurn={isMyTurn}
          setIsMyTurn={setIsMyTurn}
        />

      </div>

      {isModalOpen && selectedPotion && (
        <PotionModal
          potion={selectedPotion}
          closeModal={closeModal}
        />
      )}

      {gameEnded && (
        <GameEndingModal
          setPlayer={setPlayer}
          setIsLoggedIn={setIsLoggedIn}
          setEmail={setEmail}
          winner={winner}  // Pass winner to GameEndingModal
        />
      )}
    </>
  );
};

export default BattleScreen;