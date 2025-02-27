import React from 'react';

interface MenuButtonProps {
  text: string;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({text, onClick}) => {




  return (
    <button
      onClick={onClick}
      className="w-full h-full bg-black/50 text-white text-5xl rounded-4xl shadow-black shadow-xl border-2 border-white"
    >
      {text}
    </button>
  );
};

export default MenuButton;