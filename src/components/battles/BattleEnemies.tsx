import React from 'react';
import { Player } from '../../interfaces/Player';

interface ModalDropdownProps {
  enemies: Player[];
}

const BattleEnemies: React.FC<ModalDropdownProps> = ({enemies}) => {
  return (
    <div className='shadow-2xs shadow-white rounded'>
      <div className='text-white text-3xl text-center'>Enemies</div>
      <div className='grid grid-cols-2 gap-4'>
        {enemies.map((enemy, index) => (
          <div
            key={index}
            className='text-white text-2xl text-center'>
            {enemy.nickname}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BattleEnemies;
