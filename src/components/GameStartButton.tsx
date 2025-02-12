import React from 'react';

interface GameStartButtonProps {
  selection: string;
  onClick: () => void; // Función que se ejecuta al hacer clic
}

const GameStartButton: React.FC<GameStartButtonProps> = ({ selection, onClick }) => {

  const isDisabled = selection !== 'THE FINAL BATTLE';

  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`w-[100%] relative px-8 py-4 text-lg font-bold text-gray-100 uppercase bg-gray-800
          ${isDisabled ? 'opacity-30 cursor-not-allowed' : ''}`}
      >
        {/* Borde decorativo */}
        <span className="absolute inset-0 w-full h-full border-2 border-gray-400 rounded-lg"></span>
        {/* Texto */}
        <span className="relative text-xl">
          {selection !== 'CHOOSE BATTLE TYPE' ? `START ${selection}`: 'NO BATTLE TYPE CHOSEN'}
        </span>
      </button>
    </div>
  );

};

export default GameStartButton;
