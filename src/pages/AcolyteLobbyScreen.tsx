import React, { useEffect } from 'react';
import { listenToGameCreated } from '../sockets/socketListeners';
import useStore from './../store/useStore';

interface AcolyteLobbyProps {}

const AcolyteLobby: React.FC<AcolyteLobbyProps> = () => {
  const { player, setGameCreated } = useStore();

  console.log('acolyte lobby player:', player.nickname);

  useEffect(() => {
    listenToGameCreated(setGameCreated);
  }, []);

  return (
    <div className="flex flex-col items-center h-screen p-4 bg-black text-white text-2xl font-bold w-screen">
      <div className="flex items-center justify-center w-full h-1/8 text-8xl">Lobby</div>
      <div className="h-1/8" />
      <div className="flex items-center justify-center w-full h-2/8">
        <button 
          className="w-full h-full bg-black text-white text-5xl rounded border-2 border-white"
          onClick={() => {
            console.log('Join game');
          }}
        >
            JOIN
        </button>
      </div>
      <div className="h-1/8" />
      <div className="flex items-center justify-center w-full h-2/8">
        <button
          className="w-full h-full bg-black text-white text-5xl rounded border-2 border-white"
          onClick={() => {
            console.log('???');
          }}
        >
            ???
        </button>
      </div>
      <div className="h-1/8" />
    </div>
  );
};

export default AcolyteLobby;
