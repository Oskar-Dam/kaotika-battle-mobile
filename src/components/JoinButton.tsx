import React from 'react';
import useStore from '../store/useStore';

const JoinButton: React.FC = () => {

  const { gameCreated, setGameJoined } = useStore();
  const joinBattle = () => {
    setGameJoined(true);
    console.log('game joined');
    
  };

  return (
    <button
      onClick={() => { 
        joinBattle(); 
      }}
      className="w-full h-full bg-black text-white text-5xl rounded border-2 border-white"
      disabled={!gameCreated}
      aria-disabled={!gameCreated}
    >
      JOIN
    </button>
  );
};

export default JoinButton;