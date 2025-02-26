import React from 'react';
import ModalHeader from './ModalHeader';
import ModalImage from './ModalImage';
import BattleDescription from './BattleDescription';
import { Battle } from '../interfaces/Battle';
import BattleEnemies from './BattleEnemies';
import BattleSuggestions from './BattleSuggestions';
import BattleRewards from './BattleRewards';
import BattleModalButton from './ModalButton';

interface BattleModalProps {
  battle: Battle;
  onClose: () => void;
}

const BattleModal: React.FC<BattleModalProps> = ({ battle, onClose }) => {
  return (
    <div className='fixed inset-0 py-2 flex justify-center items-start bg-black/90 z-50 overflow-auto'>
      <div className='flex flex-col bg-black/90 p-4 rounded h-full w-[90%] max-h-full'>
        <div className='flex-shrink-0 h-[10%]'>
          <ModalHeader name={battle.name} />
        </div>
        <div className='flex-shrink-0 h-[30%]'>
          <ModalImage
            src='/images/background/TheFinalBattleBG.webp'
            alt='Battle' />
        </div>
        <div className='flex-grow overflow-auto w-full border-2 border-white rounded-lg mb-2'>
          <BattleDescription description={battle.description}/>
          <BattleEnemies enemies={battle.enemies}/>
          <BattleSuggestions battle={battle}></BattleSuggestions>
          <BattleRewards battle={battle}/>
        </div>
        <div className='flex flex-col h-[20%]'>
          <BattleModalButton
            text='Create Game'
            onClick={() => alert('Game Created')} />
          <BattleModalButton
            text='Close'
            onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default BattleModal;
