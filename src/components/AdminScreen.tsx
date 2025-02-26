import React, { useEffect } from 'react';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import { listenToGameCreated } from '../sockets/socketListeners';
import useStore from '../store/useStore';
import BattleList from './battles/BattleList';
import JoinButton from './JoinButton';
import WelcomeTexts from './WelcomeTexts';

const AdminScreen: React.FC = () => {

  const { setGameCreated } = useStore();

  useEffect(() => {
    socket.emit(SOCKET_EMIT_EVENTS.GAME_CREATED);
    console.log('sended game is created socket');

    listenToGameCreated(setGameCreated);
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
      </div>
    </div>
  );
};

export default AdminScreen;
