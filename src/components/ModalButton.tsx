import React from 'react';

interface ModalButtonProps {
  text: string;
  onClick: () => void;
}

const ModalButton: React.FC<ModalButtonProps> = ({ text, onClick }) => {
  return (
    <button 
      className='mt-4 p-2 bg-green-500 text-white rounded text-3xl'
      onClick={onClick}>
      {text}
    </button>
  );
};

export default ModalButton;
