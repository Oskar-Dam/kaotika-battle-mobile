import React from 'react';
import ModalHeader from './ModalHeader';
import ModalImage from './ModalImage';
import ModalDropdown from './ModalDropdown';
import ModalButton from './ModalButton';
import BattleDescription from './BattleDescription';
import { Battle } from '../interfaces/Battle';
import BattleEnemies from './BattleEnemies';
import BattleSuggestions from './BattleSuggestions';

interface BattleModalProps {
  battle: Battle;
  onClose: () => void;
}

const BattleModal: React.FC<BattleModalProps> = ({ battle, onClose }) => {
  return (
    <div className='fixed inset-0 py-2 flex justify-center items-start bg-black/90 z-50 overflow-auto'>
      <div className='flex flex-col bg-white p-4 rounded h-full w-[90%] max-h-full'>
        <div className='flex-shrink-0 h-[10%]'>
          <ModalHeader name={battle.name} />
        </div>
        <div className='flex-shrink-0 h-[30%]'>
          <ModalImage
            src='/images/background/TheFinalBattleBG.webp'
            alt='Battle' />
        </div>
        <div className='flex-grow overflow-auto w-full bg-purple-500'>
          <BattleDescription description={battle.description}/>
          <BattleEnemies enemies={battle.enemies}/>
          <BattleSuggestions battle={battle}></BattleSuggestions>
          <ModalDropdown
            title='Rewards'
            content='Rewards content...' />
        </div>
        <div className='flex flex-col h-[20%]'>
          <ModalButton
            text='Create Game'
            onClick={() => alert('Game Created')} />
          <ModalButton
            text='Close'
            onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default BattleModal;
