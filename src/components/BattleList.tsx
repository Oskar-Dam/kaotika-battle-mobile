import React from 'react';
import BattleCard from './BattleCard';
import mockBattles from '../__mocks__/mockBattles';

const BattleList: React.FC = () => {
  return (
    <div className='flex flex-col h-[60%] w-full items-center overflow-y-auto mt-10'>
      {mockBattles.map((battle, index) => (
        <div
          key={index}
          className='flex flex-col w-full items-center mb-2'>
          <BattleCard
            suggested_level={battle.suggested_level}
            name={battle.name} />
        </div>
      ))}
    </div>
  );
};

export default BattleList;
