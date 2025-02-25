import React from 'react';

interface BattleModalProps {
  name: string;
  onClose: () => void;
}

const BattleModal: React.FC<BattleModalProps> = ({ name, onClose }) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/90 z-50'>
      <div className='flex flex-col bg-white p-4 rounded h-[90%] w-[90%] items-center justify-center'>
        <h1 className='text-4xl mb-4'>{name}</h1>
        <button 
          className='mt-4 p-2 bg-red-500 text-white rounded text-3xl'
          onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default BattleModal;
