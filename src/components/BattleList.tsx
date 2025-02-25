import React from 'react';
import BattleCard from './BattleCard';
import mockBattles from '../__mocks__/mockBattles';
import BattleCardSeparator from './BattleCardSeparator';

const BattleList: React.FC = () => {
  return (
    <>
      <div className='flex flex-col py-2 px-5 h-[100%] w-full items-center border-2 border-gray-300 rounded-lg'>
        <div className='w-full text-center mb-1'>
          <h2 className='text-4xl  text-white'>BATTLES</h2>
        </div>
        <div className='flex flex-col h-full w-full items-center pr-5 overflow-y-scroll scrollbar scrollbar-thumb-white scrollbar-track-white'>
          {mockBattles.map((battle, index) => (
            <div
              key={index}
              className='flex flex-col w-full items-center'>
              <BattleCardSeparator/>
              <BattleCard
                suggested_level={battle.suggested_level}
                name={battle.name}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BattleList;
