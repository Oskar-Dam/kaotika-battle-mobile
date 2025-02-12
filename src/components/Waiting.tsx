import React, { useEffect, useState } from 'react';
import { Player } from '../interfaces/Player';
import { listenToGameStart, listenToInsufficientPlayers, listenToServerEventsBattleScreen } from '../sockets/socketListeners';
import Spinner from './Spinner';
import MortimerScreen from './MortimerScreen';

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
  }, []);
  
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50"
      data-testid="waiting-modal">
      {role === 'mortimer' ? <MortimerScreen/> 
        : <Spinner text={'Waiting for Mortimer to start the game'} />}
      {role === 'mortimer' && insufficientPlayers && <p className='text-4xl text-red-500 justify-center  absolute top-[60%]'>Insufficient Acolytes</p>}
    </div>
  );
};

export default Waiting;