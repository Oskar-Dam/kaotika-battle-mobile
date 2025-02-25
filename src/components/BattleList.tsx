import React from 'react';
import BattleCard from './BattleCard';
import mockBattles from '../__mocks__/mockBattles';

const BattleList: React.FC = () => {
  return (
    <>
      <div className='flex flex-col py-2 px-5 h-[100%] w-full items-center border-2 border-gray-300 rounded-lg'>
        <div className='w-full text-center mb-2'>
          <h2 className='text-4xl  text-white'>BATTLES</h2>
        </div>
        <div className='flex flex-col h-full w-full items-center overflow-y-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100'>
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
      </div>
    </>
  );
};

export default BattleList;
