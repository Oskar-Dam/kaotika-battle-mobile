import React, { useState } from 'react';
import BattleModal from './BattleModal';
import socket from '../sockets/socket';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import { Battle } from '../interfaces/Battle';


interface BattleCardProps {
battle: Battle;
}

const BattleCard: React.FC<BattleCardProps> = ({ battle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectedBattle = () => {
    setIsModalOpen(true);
    socket.emit(SOCKET_EMIT_EVENTS.GAME_SELECTED, {name});
    console.log('Emit battle selected');
  };

  return (
    <>
      <button 
        className='relative flex flex-row w-[100%] h-[13vh] justify-center items-center border-2 rounded border-white overflow-hidden'
        onClick={handleSelectedBattle}>
        <img 
          src='/images/background/TheFinalBattleBG.webp'
          alt={battle.name} 
          className='absolute w-full h-full object-cover' 
        />
        <div className='relative flex w-[100%] h-full items-center justify-center'>
          <h1
            className='text-3xl text-white bg-black/50 rounded-lg p-2'
            style={{ textShadow: '2px 2px 2px black' }}>{battle.name}</h1>
        </div>
      </button>
      {isModalOpen && (
        <BattleModal 
          name={battle.name} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default BattleCard;
