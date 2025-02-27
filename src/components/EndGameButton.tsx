import React from 'react';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';

interface EndGameButtonProps {
}

const EndGameButton: React.FC<EndGameButtonProps> = () => {

  const handleReconnect = () => {
    socket.emit(SOCKET_EMIT_EVENTS.GAME_RESET);
  };


  return (
    <button
      className="min-w-[90%] max-w-[90%] min-h-[15%] max-h-[15%] bg-black/50 text-white text-4xl rounded-4xl shadow-black shadow-xl border-2 border-white"
      onClick={handleReconnect}
    >
        RESET GAME
    </button>
  );
};

export default EndGameButton;
