import React from 'react';

interface ModalDropdownProps {
  enemies: string[];
}

const BattleEnemies: React.FC<ModalDropdownProps> = ({enemies}) => {
  return (
    <div>
      <div className='text-white text-3xl text-center'>Enemies</div>
      <div className='grid grid-cols-2 gap-4'>
        {enemies.map((enemy, index) => (
          <div
            key={index}
            className='text-white text-2xl text-center'>
            {enemy}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BattleEnemies;
