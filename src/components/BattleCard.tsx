import React from 'react';

interface BattleCardProps {
  suggested_level: number;
  name: string;
}

const BattleCard: React.FC<BattleCardProps> = ({ suggested_level, name }) => {
  return (
    <div className='flex flex-row w-[100%] h-[10vh] justify-center items-center my-1 border-2 rounded border-white'>
      <div className='flex w-[30%] h-full items-center justify-center mr-1'>
        <h1 className='text-4xl text-white'>Lv. {suggested_level}</h1>
      </div>
      
      <div className='flex w-[1%] h-[100%] items-center justify-center border-2 border-white border-solid'></div>
      <div className='flex w-[75%] h-full items-center justify-center'>
        <h1 className='text-3xl text-white'>{name}</h1>
      </div>
    </div>
  );
};

export default BattleCard;
