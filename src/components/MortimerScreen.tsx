import React, { useState } from 'react';
import GameStartButton from './GameStartButton';
import BattleTypeDropdown from './BattleTypeDropdown';
import { SOCKET_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import WelcomeTexts from './WelcomeTexts';

const MortimerScreen: React.FC = () => {
  const [selection, setSelection] = useState<string>('CHOOSE BATTLE TYPE');

  const handleStartGame = (): void => {
    console.log('Game start button pressed');
    socket.emit(SOCKET_EVENTS.GAME_START);
  };

  return (
    <div className='flex flex-col h-screen'>
      <WelcomeTexts />
      <div className='flex flex-col justify-center mt-20'>
        <div className='flex justify-center'>
          <BattleTypeDropdown
            selection={selection}
            setSelection={setSelection} />
        </div>
        <GameStartButton
          selection={selection}
          onClick={handleStartGame}/> 
      </div>
    </div>
  );
};

export default MortimerScreen;
