import React from 'react';

interface AttackButtonProps {
  text: string;
  onClick: () => void;
  isMyTurn: boolean;
}

const AttackButton: React.FC<AttackButtonProps> = ({ text = 'Void', onClick, isMyTurn }) => {
  text;
  return (
    <>
      <button
        className={`relative px-25 py-10 text-2xl font-bold text-gray-100 ${isMyTurn ? 'animate-saturation' : ''}`}
        style={{
          backgroundImage: 'url(/public/images/attack-button.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: isMyTurn ? 'saturate(1)' : 'saturate(0)'
        }}
        onClick={onClick}
      >
        <span className="absolute inset-0 w-full h-full border-0 border-gray-400 rounded-lg opacity-20 "></span>
        
      </button>
    </>
  );
};

export default AttackButton;