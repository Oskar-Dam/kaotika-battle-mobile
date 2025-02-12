import React, { useState } from 'react';
import GameStartButton from './GameStartButton';
import { SOCKET_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';

const MortimerScreen: React.FC = () => {
  const [selection, setSelection] = useState<string>('THE FINAL BATTLE');

  const handleStartGame = (): void => {
    console.log('Game start button pressed');
    socket.emit(SOCKET_EVENTS.GAME_START);
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-col justify-start mt-48'>
        <div className='flex justify-center'>
          <h1 className='text-center text-5xl text-white mb-10'>Welcome, Mortimer</h1>
        </div>
        <div className='flex justify-center'>
          <h2 className='text-center text-3xl text-white'>What battle looms ahead?</h2>
        </div>
      </div>
      <div className='flex flex-col justify-center mt-20'>
        <div className='flex justify-center'>
          <select
            value={selection}
            onChange={(e) => setSelection(e.target.value)}
            className="text-white bg-gray-800 border-2 border-gray-600 rounded-lg p-2 mb-20 w-64"
          >
            <option value="THE FINAL BATTLE">THE FINAL BATTLE</option>
            <option value="DUEL">DUEL</option>
            <option value="ENCOUNTER">ENCOUNTER</option>
          </select>
        </div>
        <GameStartButton
          selection={selection}
          onClick={handleStartGame}/> 
      </div>
    </div>
  );
};

export default MortimerScreen;
