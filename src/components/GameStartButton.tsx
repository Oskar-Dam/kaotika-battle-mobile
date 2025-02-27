import React from 'react';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import useStore from '../store/useStore';

interface GameStartButtonProps {
}

const GameStartButton: React.FC<GameStartButtonProps> = () => {


  const handleStartGame = (): void => {
    console.log('Game start button pressed');
    socket.emit(SOCKET_EMIT_EVENTS.GAME_START);
  };

  const{gameStarted} = useStore();
  const {selectedBattle} = useStore();

  console.log(gameStarted);
  

  return (
    <button
      onClick={handleStartGame}
      className={`min-w-[90%] max-w-[90%] min-h-[15%] max-h-[15%] bg-black/50 text-white text-4xl rounded-4xl shadow-black shadow-xl border-2 border-white ${ gameStarted ? 'brightness-40' : ''}`}
    >
      {/* Borde decorativo */}
      <span className="absolute inset-0 w-full h-full border-2 border-gray-400 rounded-lg"></span>
      {/* Texto */}
      <span className="relative text-center">
          START
        <span className="text-red-600 uppercase"> {selectedBattle?.name} </span>
      </span>
    </button>
  );

};

export default GameStartButton;
