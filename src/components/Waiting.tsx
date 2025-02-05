import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import Button from './Button';
import { clearListenToServerEventsBattleScreen, listenToGameStart, listenToInsufficientPlayers, listenToServerEventsBattleScreen } from '../sockets/socketListeners';
import socket from '../sockets/socket';
import { SOCKET_EVENTS } from '../sockets/events';
import { Player } from '../interfaces/Player';

// the Waiting component is a modal that displays a spinner and a message while waiting for the game to start(mortimer) or if you are mortimer, you can start the game
interface WaitingProps {
  role: string;
  setShowWaitingScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setDravocarPlayers: (players: Player[]) => void;
  setKaotikaPlayers: (players: Player[]) => void;
}
const Waiting: React.FC<WaitingProps> = ({ role, setDravocarPlayers, setKaotikaPlayers, setShowWaitingScreen }) => {

  const [insufficientPlayers, setInsufficientPlayers] = useState<boolean>(false);
  
  useEffect(() => {
    listenToServerEventsBattleScreen(setKaotikaPlayers, setDravocarPlayers);
    listenToGameStart(setShowWaitingScreen);
    listenToInsufficientPlayers(setInsufficientPlayers);
    return () => {
      clearListenToServerEventsBattleScreen();
    };
  }, []);

  const handleStartGame = (): void => {
    console.log('Game start button pressed');
    socket.emit(SOCKET_EVENTS.GAME_START);
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50">
      {role === 'mortimer' ? <Button
        text={'Start the game'}
        onClick={() => handleStartGame()} /> : <Spinner text={'Waiting for Mortimer to start the game'} />}
      {role === 'mortimer' && insufficientPlayers && <p className='text-4xl text-red-500 justify-center  absolute top-[60%]'>Insufficient Acolytes</p>}
    </div>
  );
};

export default Waiting;