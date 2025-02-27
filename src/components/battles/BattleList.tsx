import React from 'react';
import useStore from '../../store/useStore';
import BattleCard from './BattleCard';
import BattleCardSeparator from './BattleCardSeparator';
import Spinner from '../Spinner';

const BattleList: React.FC = () => {
  const { battles } = useStore();
  return (
    <>
      <div className='flex flex-col py-2 px-5 h-[100%] w-full items-center border-2 border-gray-300 rounded-lg bg-black/55'>
        <div className='w-full text-center mb-1'>
          <h2 className='text-4xl  text-white'>BATTLES</h2>
        </div>
        <div className={`flex flex-col h-full w-full items-center pr-3 overflow-y-scroll scrollbar scrollbar-thumb-white scrollbar-track-white ${battles.length < 1 ? 'justify-center' : ''}`}>
          {battles.length > 1 ? (
            battles.map((battle, index) => (
              <div
                key={index}
                className='flex flex-col w-full items-center'>
                <BattleCardSeparator/>
                <BattleCard
                  battle={battle}>
                </BattleCard>
              </div>
            ))
          ) : (
            <Spinner text="Loading battles" />
          )}
        </div>
      </div>
    </>
  );
};

export default BattleList;
