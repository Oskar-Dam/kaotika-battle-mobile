import React, { useEffect } from 'react';
import JoinButton from '../components/JoinButton';
import ReturnToModeSelectionScreenButton from '../components/mode selection/ReturnToModeSelectionButton';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';

const AcolyteLobby: React.FC = () => {
  useEffect(() => {
    socket.emit(SOCKET_EMIT_EVENTS.GAME_CREATED);
    console.log('sended game is created socket');
    socket.emit(SOCKET_EMIT_EVENTS.GAME_STARTED);
    console.log('sended game started socket');
  }, []);

  const buttons = [
    { id: 'join', component: <JoinButton/> },
    { id: 'return', component: <ReturnToModeSelectionScreenButton /> },
  ];

  return (
    <div
      className="flex flex-col items-center h-screen p-4 bg-black text-white text-2xl font-bold w-screen"
      style={{
        backgroundColor: 'black',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: '50%',
        backgroundPositionY: '35%',
        backgroundImage: 'url(/images/acolyt-lobby-screen.webp)',
        backgroundSize: '100% 100%',
      }}
      data-testid="acolyte-lobby-screen"
    >
      <div className="flex items-center justify-center w-[80%] py-14 h-1/8 text-8xl text-white bg-black/50 rounded-lg">
        Lobby
      </div>

      <div className={`flex flex-col items-center gap-6 w-full h-6/8 overflow-y-auto mt-5 ${buttons.length < 5 ? 'justify-center' : ''}`}>
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

export default AcolyteLobby;
