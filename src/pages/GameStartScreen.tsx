import React from 'react';
import GameStartButton from '../components/GameStartButton';


const GameStartScreen: React.FC = () => {

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-col justify-center h-1/4 text-white text-4xl text-center '>
        Press the button to start the previously selected battle
      </div>

      <div className='flex flex-col justify-center h-1/2'></div>

      <div className='flex justify-center h-1/4 items-center'>
        <GameStartButton/> 
      </div>
    </div>
  );
};

export default GameStartScreen;