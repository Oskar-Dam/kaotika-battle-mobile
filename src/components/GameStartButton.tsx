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
        className={`w-[280px] relative px-8 py-4 text-lg font-bold text-gray-100 uppercase transition-transform duration-200 transform bg-gray-800 border-2 border-gray-600 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 active:scale-95 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {/* Borde decorativo */}
        <span className="absolute inset-0 w-full h-full border-2 border-gray-400 rounded-lg opacity-20"></span>
        {/* Texto */}
        <span className="relative">START {selection}</span>
      </button>
    </div>
  );

};

export default GameStartButton;
