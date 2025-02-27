import React, { useEffect } from 'react';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import MenuButton from '../components/MenuButton';
import useStore from '../store/useStore';
import { MobileJoinBattleResponse } from '../interfaces/JoinBattleReponse';

const AcolyteLobby: React.FC = () => {
  useEffect(() => {
    socket.emit(SOCKET_EMIT_EVENTS.GAME_CREATED);
    console.log('sended game is created socket');
    socket.emit(SOCKET_EMIT_EVENTS.GAME_STARTED);
    console.log('sended game started socket');
  }, []);

  const { setGameJoined ,gameCreated, player, gameStarted, setIsBattleSelected, setIsAdventureSelected} = useStore();
  
  const joinBattle = () => {
    socket.emit(SOCKET_EMIT_EVENTS.JOIN_BATTLE, player._id, (response: MobileJoinBattleResponse) => {
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

  const buttons = [
    { id: 'Join', component: <MenuButton
      text='JOIN'
      onClick={joinBattle}
      disabled={!gameCreated || gameStarted}
      ariaDisabled={!gameCreated || gameStarted}
      extraStyles={!gameCreated || gameStarted ? 'text-red-500 border-red-500' : 'text-green-500 border-green-500'}/> },
    { id: 'Return', component: <MenuButton
      text='Back to mode selection'
      onClick={returnToModeSelection}
      disabled={false}
      ariaDisabled={false} 
      extraStyles=''/> },
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
      <div className="flex items-center justify-center w-[80%] py-14 h-1/8 text-8xl rounded-lg">
      </div>

      <div className={`flex flex-col items-center gap-6 p-3 w-full overflow-y-auto pr-3 z-10 mt-5 ${buttons.length <= 5 ? 'justify-between h-[70%] ' : 'h-[90%] border-2 border-white rounded-lg'}`}>
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
