import React, { useState } from 'react';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import BattleTypeDropdown from './BattleTypeDropdown';
import EncounterDropdown from './EncounterDropdown';
import GameStartButton from './GameStartButton';
import WelcomeTexts from './WelcomeTexts';

const MortimerScreen: React.FC = () => {
  const [selection, setSelection] = useState<string>('CHOOSE BATTLE TYPE');

  const handleStartGame = (): void => {
    console.log('Game start button pressed');
    socket.emit(SOCKET_EMIT_EVENTS.GAME_START);
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-col justify-center h-1/4 '>
        <WelcomeTexts />
      </div>
      <div className='flex flex-col justify-center h-1/2 '>
        <div className='flex justify-center h-1/2 items-center'>
          <BattleTypeDropdown
            selection={selection}
            setSelection={setSelection} />
        </div>
        <div className='flex justify-center h-1/2 items-center'>
          {selection === 'ENCOUNTER' && (
            <EncounterDropdown />
          )}
        </div>
      </div>
      <div className='flex justify-center h-1/4 items-center'>
        <GameStartButton
          selection={selection}
          onClick={handleStartGame}/> 
      </div>
    </div>
  );
};

export default MortimerScreen;
