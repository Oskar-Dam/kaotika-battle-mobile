import React from 'react';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import GameStartButton from '../components/GameStartButton';


const GameStartScreen: React.FC = () => {

  const handleStartGame = (): void => {
    console.log('Game start button pressed');
    socket.emit(SOCKET_EMIT_EVENTS.GAME_START);
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-col justify-center h-1/4 '>
        The Battle is about to START!
      </div>

      <div className='flex justify-center h-1/4 items-center'>
        <GameStartButton
          onClick={handleStartGame}/> 
      </div>
    </div>
  );
};

export default GameStartScreen;