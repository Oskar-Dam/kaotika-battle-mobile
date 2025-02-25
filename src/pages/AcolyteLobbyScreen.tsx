import React, { useEffect } from 'react';
import JoinButton from '../components/JoinButton';
import { listenToGameCreated } from '../sockets/socketListeners';
import useStore from './../store/useStore';

const AcolyteLobby: React.FC = () => {
  const { player, setGameCreated } = useStore();

  console.log('acolyte lobby player:', player.nickname);

  useEffect(() => {
    listenToGameCreated(setGameCreated);
  }, []);

  return (
    <div
      className="flex flex-col items-center h-screen p-4 bg-black text-white text-2xl font-bold w-screen"
      style={{ backgroundColor: 'black', backgroundRepeat:'no-repeat',backgroundPositionX:'50%',backgroundPositionY:'35%' ,backgroundImage: 'url(/images/acolyt-lobby-screen.webp)', backgroundSize: '100% 100%' }}
      data-testid="acolyte-lobby-screen"
    >
      <div className="flex items-center justify-center w-full h-1/8 text-8xl text-black">Lobby</div>
      <div className="h-1/8" />
      <div className="flex items-center justify-center w-full h-2/8">
        <JoinButton/>
      </div>
      <div className="h-1/8" />
      <div className="flex items-center justify-center w-full h-2/8">
        <button
          className="w-full h-full bg-black text-white text-5xl rounded-4xl shadow-black shadow-xl border-2 border-white"
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
