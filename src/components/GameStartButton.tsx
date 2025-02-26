import React from 'react';
import useStore from '../store/useStore';

interface GameStartButtonProps {
  onClick: () => void; // Función que se ejecuta al hacer clic
}

const GameStartButton: React.FC<GameStartButtonProps> = ({onClick }) => {


  const {selectedBattle} = useStore();

  return (
    <div className="flex justify-center w-[95%]">
      <button
        onClick={onClick}
        className={'w-[95%] relative px-8 py-4 text-lg font-bold text-gray-100 uppercase bg-gray-800'}
      >
        {/* Borde decorativo */}
        <span className="absolute inset-0 w-full h-full border-2 border-gray-400 rounded-lg"></span>
        {/* Texto */}
        <span className="relative text-2xl text-center">
          START
          <span className="text-2xl text-red-600"> {selectedBattle?.name} </span> 
          <span>BATTLE</span>
        </span>
      </button>
    </div>
  );

};

export default GameStartButton;
