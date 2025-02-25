import React from 'react';
import BattleCard from './BattleCard';
import mockBattles from '../__mocks__/mockBattles';

const BattleList: React.FC = () => {
  return (
    <div className='flex flex-col h-[100%] w-full items-center overflow-y-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 border border-gray-300 rounded-lg'>
      <div className='flex w-full items-center text-white justify-center text-4xl rounded-2xl'>BATTLES</div>
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
