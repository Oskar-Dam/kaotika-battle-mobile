import React from 'react';
import GameStartButton from '../components/GameStartButton';


const GameStartScreen: React.FC = () => {

  return (
    <div className='flex flex-col h-screen items-center justify-around'>
      <div className='flex flex-col justify-center w-[90%] text-white text-6xl text-center '>
        Press the button to start the previously selected battle
      </div>

      <GameStartButton/> 
    </div>
  );
};

export default GameStartScreen;