import React, { useEffect } from 'react';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import BattleList from './battles/BattleList';
import MenuButton from './MenuButton';
import useStore from '../store/useStore';
import { MobileJoinBattleResponse } from '../interfaces/JoinBattleReponse';

const AdminScreen: React.FC = () => {

  const { setGameJoined, gameCreated, player, gameStarted, setIsBattleSelected, setIsAdventureSelected} = useStore();

  const joinBattle = () => {
    socket.emit(SOCKET_EMIT_EVENTS.JOIN_BATTLE, player._id, (response: MobileJoinBattleResponse ) => {
      if (response.status === 'OK') {
        console.log('Received OK status from join battle');    
        setGameJoined(response.joinBattle);
      }
      else {
        console.error(response.error);
      }
    });
    console.log('Sent join battle socket');
  };

  const returnToModeSelection = () => {
    setIsBattleSelected(false);
    setIsAdventureSelected(false);
    console.log('Return to the mode selection screen');
  };
  
  useEffect(() => {
    socket.emit(SOCKET_EMIT_EVENTS.GAME_CREATED);
    console.log('sended game is created socket');
    socket.emit(SOCKET_EMIT_EVENTS.GAME_STARTED);
    console.log('sended game started socket');
  }, []);

  return (
    <div
      className='flex h-screen w-screen'
      style={{backgroundImage: 'url(/images/background/adminScreenBG.webp)', backgroundSize: '100% 100%'}}>

      <div className='flex flex-col justify-start items-center h-full w-full'>
        <div className='flex h-[70%] w-[95%] mb-3 mt-5'>
          <BattleList/>
        </div>
        <div className='flex h-[10%] w-[90%] mb-2'>
          <MenuButton
            text='JOIN'
            onClick={joinBattle}
            disabled={!gameCreated || gameStarted}
            ariaDisabled={!gameCreated || gameStarted}
            extraStyles={!gameCreated || gameStarted ? 'text-red-500 border-red-500' : 'text-green-500 border-green-500'}/>
        </div>
        <div className='flex h-[10%] w-[90%] mt-2'>
          <MenuButton
            text='Back to mode selection'
            onClick={returnToModeSelection}
            disabled={false}
            ariaDisabled={false} 
            extraStyles=''/> 
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
