import React from 'react';

interface ModalButtonProps {
  text: string;
  onClick: () => void;
  color: 'green' | 'red';
}

const BattleModalButton: React.FC<ModalButtonProps> = ({ text, onClick, color }) => {
  const colorClasses = color === 'green' ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500';

  return (
    <button 
      className={`h-full w-[50%] bg-black text-5xl rounded-4xl shadow-black shadow-xl border-2 mb-2 ${colorClasses}`}
      onClick={onClick}>
      {text}
    </button>
  );
};

export default BattleModalButton;
