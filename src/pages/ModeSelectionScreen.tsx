import React, { useEffect, useRef } from 'react';
import SelectAdventureMode from '../components/mode selection/AdventureModeButton';
import SelecteBattleModeButton from '../components/mode selection/SelectBattleModeButon';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';

const ModeSelection: React.FC = () => {

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
    socket.emit(SOCKET_EMIT_EVENTS.GAME_CREATED);
    console.log('sended game is created socket');
  }, []);


  const buttons = [
    { id: 'selectBattle', component: <SelecteBattleModeButton/> },
    { id: 'selectAdventure', component: <SelectAdventureMode/> },
  ];

  return (
    <div
      className="flex flex-col items-center h-screen p-4 bg-black text-white text-2xl font-bold w-screen"
      style={{ backgroundColor: 'black', backgroundRepeat:'no-repeat',backgroundPositionX:'50%',backgroundPositionY:'35%' ,backgroundImage: 'url(/images/acolyt-lobby-screen.webp)', backgroundSize: '100% 100%' }}
      data-testid="acolyte-lobby-screen"
    >
      <video
        ref={videoRef}        
        autoPlay
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
        loop      
      >
        <source
          src="/videos/cript.mp4"
          type="video/mp4" />
      </video>

      <div className="z-1 flex items-center justify-center w-full h-1/8 text-6xl text-white">Mode Selection</div>
      <div className={`flex flex-col items-center gap-6 w-full h-6/8 overflow-y-auto z-10 mt-5 ${buttons.length < 5 ? 'justify-center' : ''}`}>
        {buttons.map(({ id, component }) => (
          <div
            key={id}
            className="flex items-center justify-center w-full h-[15%] min-h-[15%]">
            {component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModeSelection;
