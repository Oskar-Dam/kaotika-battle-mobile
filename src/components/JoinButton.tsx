import React from 'react';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import useStore from '../store/useStore';

const JoinButton: React.FC = () => {

  const { player ,gameCreated } = useStore();
  const joinBattle = () => {
    socket.emit(SOCKET_EMIT_EVENTS.JOIN_BATTLE, player._id);
    console.log('sended join battle socket');
  };

  return (
    <button
      onClick={() => { 
        joinBattle(); 
      }}
      className="w-full h-full bg-black text-white text-5xl rounded-4xl shadow-black shadow-xl border-2 border-white"
      disabled={!gameCreated}
      aria-disabled={!gameCreated}
    >
      JOIN
    </button>
  );
};

export default JoinButton;