import React from 'react';
import { MobileJoinBattleResponse } from '../interfaces/JoinBattleReponse';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import useStore from '../store/useStore';

const JoinButton: React.FC = () => {

  const { setGameJoined ,gameCreated } = useStore();
  const joinBattle = () => {
    socket.emit(SOCKET_EMIT_EVENTS.JOIN_BATTLE, (response: MobileJoinBattleResponse) => {
      if (response.status === 'OK') {
        setGameJoined(response.joinBattle);
      }
      else {
        console.error(response.error);
      }
    });
    
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