import React from 'react';
import { Battle } from '../interfaces/Battle';

interface ModalDropdownProps {
  battle: Battle;
}

const BattleSuggestions: React.FC<ModalDropdownProps> = ({battle}) => {
  return (
    <div>
      <div className='flex justify-between p-2 shadow-2xs shadow-white rounded'>
        <div className='flex-1 text-center'>
          <div className='text-white text-2xl'>Suggested Level</div>
          <div className='text-white text-xl'>Lv. {battle.suggested_level}</div>
        </div>
        <div className='flex-1 text-center'>
          <div className='text-white text-2xl'>Drop Item Level</div>
          <div className='text-white text-xl'>Lv. {battle.drop_item_level}</div>
        </div>
      </div>
    </div>
  );
};

export default BattleSuggestions;
