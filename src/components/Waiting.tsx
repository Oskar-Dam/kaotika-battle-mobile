import React, { useEffect } from 'react';
import Spinner from './Spinner';
import Button from './Button';
import { clearListenToServerEventsBattleScreen, listenToGameStart, listenToServerEventsBattleScreen } from "../sockets/socketListeners";
import PlayerInterface from "../interfaces/PlayerInterface";
import socket from '../sockets/socket';
import { SOCKET_EVENTS } from '../sockets/events';

// the Waiting component is a modal that displays a spinner and a message while waiting for the game to start(mortimer) or if you are mortimer, you can start the game
interface WaitingProps {
  role: string | undefined;
  setShowWaitingScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setDravocarPlayers: (players: PlayerInterface[]) => void;
  setKaotikaPlayers: (players: PlayerInterface[]) => void;
}
const Waiting: React.FC<WaitingProps> = ({ role, setDravocarPlayers, setKaotikaPlayers, setShowWaitingScreen }) => {

  useEffect(() => {
    listenToServerEventsBattleScreen(setDravocarPlayers, setKaotikaPlayers)
    listenToGameStart(setShowWaitingScreen);
    return () => {
      clearListenToServerEventsBattleScreen();
    };
  }, []);

  const handleStartGame = (): void => {
    console.log("game started");
    socket.emit(SOCKET_EVENTS.GAME_START);
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50">
      {role === "MORTIMER" ? <Button text={'Start the game'} onClick={handleStartGame} /> : <Spinner text={'Waiting for Mortimer to start the game'} />}
    </div>
  );
};

export default Waiting;