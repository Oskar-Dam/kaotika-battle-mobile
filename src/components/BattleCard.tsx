import React from 'react';
import BattleCardSeparator from './BattleCardSeparator';

const BattleCard: React.FC = () => {
  return (
    <>
      <div className='flex flex-row h-[13%] w-[90%] bg-green-200'>
        <div className='w-[25%] flex items-center justify-center bg-white'>
          <h1 className='text-4xl'>Lv. 5</h1>
        </div>
        <div className='w-[1%] flex items-center justify-center bg-amber-950'>
        </div>
        <div className='w-[75%] flex items-center justify-center bg-blue-600'>
          <h1 className='text-3xl'>The Fight on the Tower</h1>
        </div>
      </div>
      <BattleCardSeparator/>
    </>
  );
};

export default BattleCard;
