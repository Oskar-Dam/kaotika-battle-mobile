import React, { useState } from 'react';
import { Battle } from '../../interfaces/Battle';
import { SOCKET_EMIT_EVENTS } from '../../sockets/events';
import socket from '../../sockets/socket';
import useStore from '../../store/useStore';
import BattleModal from './BattleModal';


interface BattleCardProps {
  battle: Battle;
}

const BattleCard: React.FC<BattleCardProps> = ({ battle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setSelectedBattle, gameCreated, selectedBattle } = useStore();

  const handleSelectedBattle = () => {
    if (!gameCreated) {
      setSelectedBattle(battle);
    }
    socket.emit(SOCKET_EMIT_EVENTS.GAME_SELECTED, battle._id);
    console.log('Emit battle selected');
  };

  const isSelected = selectedBattle?._id === battle._id;

  return (
    <>
      <button
        className={`relative flex flex-row w-full h-[13vh] justify-center items-center border-2 rounded overflow-hidden transition-transform duration-100 active:scale-95 ${isSelected ? 'border-green-500' : 'border-white'}`}
        onClick={handleSelectedBattle}
        disabled={gameCreated}
      >
        <img
          src={`/images/background/${battle.battle_background}`}
          alt={battle.name}
          className='absolute w-full h-full object-cover'
        />
        <div className='relative flex w-[100%] h-full items-center justify-center'>
          <h1
            className='text-3xl text-white bg-black/50 rounded-lg p-2'
            style={{ textShadow: '2px 2px 2px black' }}>{battle.name}</h1>
        </div>
      </button>
      {isModalOpen && !gameCreated && (
        <BattleModal
          battle={battle}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default BattleCard;
