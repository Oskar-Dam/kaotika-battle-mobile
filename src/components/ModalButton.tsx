import React from 'react';

interface ModalButtonProps {
  text: string;
  onClick: () => void;
}

const BattleModalButton: React.FC<ModalButtonProps> = ({ text, onClick }) => {
  return (
    <button 
      className='bg-black text-white text-5xl rounded-4xl shadow-black shadow-xl border-2 border-white mb-2'
      onClick={onClick}>
      {text}
    </button>
  );
};

export default BattleModalButton;
