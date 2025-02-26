import React from 'react';
import { MobileJoinBattleResponse } from '../interfaces/JoinBattleReponse';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import useStore from '../store/useStore';

const JoinButton: React.FC = () => {

  const { setGameJoined ,gameCreated, player, gameStarted} = useStore();
  const joinBattle = () => {
    socket.emit(SOCKET_EMIT_EVENTS.JOIN_BATTLE, player._id, (response: MobileJoinBattleResponse) => {
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
      className={`w-full h-full bg-black text-white text-5xl rounded-4xl shadow-black shadow-xl border-2 ${gameCreated ? 'border-green-500' : 'border-red-500'}`}
      disabled={!gameCreated || gameStarted}
      aria-disabled={!gameCreated || gameStarted}
    >
      <span className={gameCreated ? 'text-green-500' : 'text-red-500'}>JOIN</span>
    </button>
  );
};

export default JoinButton;