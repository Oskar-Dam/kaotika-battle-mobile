import React, { useEffect } from 'react';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import BattleList from './battles/BattleList';
import JoinButton from './JoinButton';
import ReturnToModeSelectionScreenButton from './mode selection/ReturnToModeSelectionButton';
import WelcomeTexts from './WelcomeTexts';

const AdminScreen: React.FC = () => {
  
  useEffect(() => {
    socket.emit(SOCKET_EMIT_EVENTS.GAME_CREATED);
    console.log('sended game is created socket');
  }, []);

  return (
    <div
      className='flex h-screen w-screen'
      style={{backgroundImage: 'url(/images/background/adminScreenBG.webp)', backgroundSize: '100% 100%'}}>

      <div className='flex flex-col justify-start items-center h-full w-full'>
        <div className='flex h-[20%]'>
          <WelcomeTexts/>
        </div>
        <div className='flex h-[55%] w-[95%] mb-5'>
          <BattleList/>
        </div>
        <div className='flex h-[10%] w-[80%]'>
          <JoinButton/>
        </div>
        <div className='flex h-[10%] w-[80%] mt-2'>
          <ReturnToModeSelectionScreenButton/>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
