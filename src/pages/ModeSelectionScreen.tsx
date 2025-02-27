import React, { useEffect, useRef } from 'react';
import SelecteBattleModeButton from '../components/mode selection/SelectBattleModeButon';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';

const ModeSelection: React.FC = () => {

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
      videoRef.current.play().catch(() => {
        console.log('Autoplay blocked, requires user interaction');
      });
    }
    socket.emit(SOCKET_EMIT_EVENTS.GAME_CREATED);
    console.log('sended game is created socket');
  }, []);



  return (
    <div
      className="flex flex-col items-center h-screen p-4 bg-black text-white text-2xl font-bold w-screen"
      data-testid="acolyte-lobby-screen"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-[0]"
        loop
      >
        <source
          src="/videos/cript.mp4"
          type="video/mp4" />
      </video>

      <div className="z-1 flex items-center justify-center w-full h-1/8 text-6xl text-white">Mode Selection</div>
      <div className="z-1 h-1/8" />
      <div className="flex items-center justify-center w-full h-2/8">
        <SelecteBattleModeButton/>
      </div>
      <div className="z-1 h-1/8" />
      <div className="z-1 flex items-center justify-center w-full h-2/8">
        <button
          className="w-full h-[50%] bg-black/50 text-white text-5xl rounded-4xl shadow-black shadow-xl border-2 border-white"
          onClick={() => {
            console.log('Adventure mode Coming Soon');
          }}
        >
            Adventure
        </button>
      </div>
      <div className="h-1/8" />
    </div>
  );
};

export default ModeSelection;
