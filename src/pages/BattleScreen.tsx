import React, { useEffect, useState } from 'react';
import Actions from '../components/Actions';
import Avatar from '../components/Avatar';
import BlockedScreen from '../components/BlockedScreen';
import CarouselContainer from '../components/CarouselContainer';
import GameEndingModal from '../components/GameEndingModal';
import HitPointsBar from '../components/HitPointsBar';
import NickName from '../components/NickName';
import PotionModal from '../components/PotionModal';
import StaminaBar from '../components/StaminaBar';
import Waiting from '../components/Waiting';
import { Factions } from '../interfaces/Factions';
import { Player } from '../interfaces/Player';

import { Potion } from '../interfaces/Potion';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import { clearListenToServerEventsBattleScreen, listenToChangeTurn, listenToGameEnded, listenToGameReset, listenToRemovePlayer, listenToServerEventsBattleScreen, listenToUpdatePlayer } from '../sockets/socketListeners';
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
  const [filteredFaction, setFilteredFaction] = useState<Factions|undefined>(player.isBetrayer ? 'KAOTIKA' : 'DRAVOKAR');
  const [kaotikaPlayers, setKaotikaPlayers] = useState<Player[]>([]);
  const [dravokarPlayers, setDravokarPlayers] = useState<Player[]>([]);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>('Kaotika');
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number>(1);
  const [userDead, setUserDead] = useState<boolean>(false);

  // ⬇️ SETTERS CALLED HERE FOR ESLINT TO IGNORE NOT CALLING THEM, DELETE AFTER SOCKET IMPLEMENTATION⬇️ //
  setGameEnded;
  setWinner;
  setIsLoggedIn;
  setEmail;

  const factionsSetters = {
    'kaotika': setKaotikaPlayers,
    'dravokar': setDravokarPlayers
  };

  useEffect(() => {
    listenToServerEventsBattleScreen(setKaotikaPlayers, setDravokarPlayers);
    listenToUpdatePlayer(factionsSetters, setPlayer, player);
    listenToRemovePlayer(setKaotikaPlayers, setDravokarPlayers, kaotikaPlayers, dravokarPlayers, setUserDead, player);
    listenToChangeTurn(setIsMyTurn, player, kaotikaPlayers, dravokarPlayers, setSelectedPlayerIndex, setFilteredFaction);
    listenToGameEnded(setGameEnded, setWinner); 
    listenToGameReset(setGameEnded, setIsMyTurn, setIsLoggedIn, setEmail, setPlayer, setKaotikaPlayers, setDravokarPlayers);

    console.log('KAOTIKA PLAYERS: ', kaotikaPlayers);
    console.log('DRAVOKAR PLAYERS: ', dravokarPlayers);
    
    return () => {
      clearListenToServerEventsBattleScreen();
    };
  }, [kaotikaPlayers, dravokarPlayers, player]);

  useEffect(() => {
    if (isMyTurn) {
      if (!player.isBetrayer) {
        if (dravokarPlayers.length > 0) {
          console.log('Emitting first dravokar player');
          socket.emit(SOCKET_EMIT_EVENTS.SET_SELECTED_PLAYER, dravokarPlayers[0]._id);
        } else {
          console.log('No dravokar players available');
        }
      } else {
        if (kaotikaPlayers.length > 0) {
          console.log('Emitting first kaotika player');
          socket.emit(SOCKET_EMIT_EVENTS.SET_SELECTED_PLAYER, kaotikaPlayers[0]._id);
        } else {
          console.log('No kaotika players available');
        }
      }
    }
  }, [isMyTurn, player.isBetrayer, dravokarPlayers, kaotikaPlayers]);

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
      {!isMyTurn && !userDead && !showWaitingScreen &&<> <BlockedScreen role={player.role}/></> }
      {userDead && <DeadScreen role={player.role} />}

      {showWaitingScreen && (
        <Waiting 
          role={player.role}
          setDravokarPlayers={setDravokarPlayers}
          setKaotikaPlayers={setKaotikaPlayers}
          setShowWaitingScreen={setShowWaitingScreen}
        />)
      }

      {/* MAIN FRAME */}
      <div
        className='w-screen h-screen flex flex-col items-center justify-center top-0 z-20'
        style={{ backgroundImage: frameBackground, backgroundSize: '100% 100%' }}
        data-testid="battle-screen"
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
          dravokarPlayers={dravokarPlayers}
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
          role={player.role}
          winner={winner}  // Pass winner to GameEndingModal
        />
      )}
    </>
  );
};

export default BattleScreen;