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
        className='flex flex-row w-[100%] h-[13vh] justify-center items-center border-2 rounded border-white'
        onClick={handleSelectedBattle}>
        <div className='flex w-[30%] h-full items-center justify-center mr-1'>
          <h1 className='text-4xl text-white'>Lv. {battle.suggested_level}</h1>
        </div>
        
        <div className='flex w-[1%] h-[100%] items-center justify-center border-2 border-white border-solid'></div>
        <div className='flex w-[75%] h-full items-center justify-center'>
          <h1 className='text-3xl text-white'>{battle.name}</h1>
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
