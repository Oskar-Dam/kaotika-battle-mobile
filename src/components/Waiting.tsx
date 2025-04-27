import React, { useEffect, useState } from 'react';
import GameStartScreen from '../pages/GameStartScreen';
import { listenToGameStart, listenToInsufficientPlayers, listenToServerEventsBattleScreen } from '../sockets/socketListeners';
import useStore from './../store/useStore';
import Spinner from './Spinner';

// the Waiting component is a modal that displays a spinner and a message while waiting for the game to start(mortimer) or if you are mortimer, you can start the game
interface WaitingProps {
  setShowWaitingScreen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Waiting: React.FC<WaitingProps> = ({ setShowWaitingScreen }) => {

  const [insufficientPlayers, setInsufficientPlayers] = useState<boolean>(false);
  const {
    player,
    setDravokarPlayers, 
    setKaotikaPlayers,
  } = useStore();

  useEffect(() => {
    listenToServerEventsBattleScreen(setKaotikaPlayers, setDravokarPlayers);
    listenToGameStart(setShowWaitingScreen);
    listenToInsufficientPlayers(setInsufficientPlayers);
  }, []);
  
  return (
    <div
      className="flex items-center justify-center bg-black/95 z-1 absolute h-full"
      data-testid="waiting-modal">
      {player.role === 'mortimer' || player.role === 'villain' ? <GameStartScreen/> 
        : <Spinner text={'Waiting for Mortimer to start the game'} />}
      {player.role === 'mortimer' && insufficientPlayers && <p className='text-4xl text-red-500 justify-center  absolute top-[60%]'>Insufficient Acolytes</p>}
    </div>
  );
};

export default Waiting;