import React from 'react';
import ModalHeader from './ModalHeader';
import ModalImage from './ModalImage';
import ModalDropdown from './ModalDropdown';
import ModalButton from './ModalButton';

interface BattleModalProps {
  name: string;
  onClose: () => void;
}

const BattleModal: React.FC<BattleModalProps> = ({ name, onClose }) => {
  return (
    <div className='fixed inset-0 py-2 flex justify-center items-start bg-black/90 z-50 overflow-auto'>
      <div className='flex flex-col bg-white p-4 rounded h-full w-[90%] max-h-full'>
        <div className='flex-shrink-0 h-[10%]'>
          <ModalHeader name={name} />
        </div>
        <div className='flex-shrink-0 h-[30%]'>
          <ModalImage
            src='/path/to/image.jpg'
            alt='Battle' />
        </div>
        <div className='flex-grow overflow-auto w-full bg-purple-500 h-[40%]'>
          <ModalDropdown
            title='Description'
            content='Description content...' />
          <ModalDropdown
            title='Enemies'
            content='Enemies content...' />
          <ModalDropdown
            title='Suggested Level'
            content='Suggested Level content...' />
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
