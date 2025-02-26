import React from 'react';
import { Battle } from '../interfaces/Battle';

interface ModalDropdownProps {
  battle: Battle;
}

const BattleRewards: React.FC<ModalDropdownProps> = ({battle}) => {
  return (
    <div>
      <div className='flex flex-col items-center p-2 shadow-2xs shadow-white rounded'>
        <div className='text-white text-3xl'>Rewards</div>
        <div className='flex justify-between w-full mt-2'>
          <div className='flex-1 text-center'>
            <div className='text-white text-xl'>
              <span className='text-4xl'>{battle.gold}</span> <span className='text-xl'>GOLD</span>
            </div>
          </div>
          <div className='flex-1 text-center'>
            <div className='text-white text-xl'>
              <span className='text-4xl'>{battle.exp}</span> <span className='text-xl'>EXP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleRewards;
