import React from 'react';

interface AttackButtonProps {
  text: string;
}

const AttackButton: React.FC<AttackButtonProps> = ({ text = 'Void' }) => {
  text;
  return (
    <>
      <button
        className="relative px-25 py-10 text-2xl font-bold text-gray-100 animate-saturation"
        style={{ backgroundImage: 'url(/public/images/ATTACK_BUTTON.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <span className="absolute inset-0 w-full h-full border-0 border-gray-400 rounded-lg opacity-20 "></span>
        
      </button>
    </>
  );
};

export default AttackButton;