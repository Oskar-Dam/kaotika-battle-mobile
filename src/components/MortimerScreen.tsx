import React from 'react';
import Button from './Button';
import socket from '../sockets/socket';
import { SOCKET_EVENTS } from '../sockets/events';

const MortimerScreen: React.FC = () => {

  const handleStartGame = (): void => {
    console.log('Game start button pressed');
    socket.emit(SOCKET_EVENTS.GAME_START);
  };

  return (
    <div>
      <Button
        text={'Start the game'}
        onClick={() => handleStartGame()}
      />
    </div>
  );
};

export default MortimerScreen;
