import React from 'react';

interface AdventureButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
  ariaDisabled: boolean;
  extraStyles: string;
}

const AdventureButton: React.FC<AdventureButtonProps> = ({text, onClick, disabled, ariaDisabled, extraStyles}) => {
  const appliedStyles = extraStyles || 'text-white border-white';
  return (
    <button
      onClick={onClick}
      className={`w-full h-full bg-black/50 text-5xl rounded-2xl shadow-black shadow-xl border-2 ${appliedStyles}`}
      disabled={disabled}
      aria-disabled={ariaDisabled}
    >
      {text}
    </button>
  );
};

export default AdventureButton;