import React from 'react';

interface MenuButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
  ariaDisabled: boolean;
  extraStyles: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ text, onClick, disabled, ariaDisabled, extraStyles }) => {
  const appliedStyles = extraStyles || 'text-white border-white';
  return (
    <button
      onClick={onClick}
      className={`w-full h-full bg-black/50 text-4xl rounded-4xl shadow-black shadow-xl border-2 transition-none active:scale-95 ${appliedStyles}`}
      disabled={disabled}
      aria-disabled={ariaDisabled}
    >
      {text}
    </button>
  );
};

export default MenuButton;