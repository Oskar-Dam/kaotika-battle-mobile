import React, { useEffect, useState } from 'react';
import { MobileJoinBattleResponse } from '../interfaces/JoinBattleReponse';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import { listenToGameCreated } from '../sockets/socketListeners';
import useStore from '../store/useStore';
import BattleList from './battles/BattleList';
import MenuButton from './MenuButton';

const AdminScreen: React.FC = () => {
  const { setGameJoined, gameCreated, player, gameStarted, setIsBattleSelected, setIsAdventureSelected, setGameCreated, setGameEnded } = useStore();

  const [resetEffect, setResetEffect] = useState(false);

  const joinBattle = () => {
    socket.emit(SOCKET_EMIT_EVENTS.JOIN_BATTLE, player._id, (response: MobileJoinBattleResponse) => {
      if (response.status === 'OK') {
        console.log('Received OK status from join battle');
        setGameJoined(response.joinBattle);
      } else {
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
    // Emitir eventos iniciales
    socket.emit(SOCKET_EMIT_EVENTS.GAME_CREATED);
    console.log('sended game is created socket');
    socket.emit(SOCKET_EMIT_EVENTS.GAME_STARTED);
    console.log('sended game started socket');

    // Escuchar el evento GAME_CREATED
    listenToGameCreated(setGameCreated);

    return () => {
      // Limpieza de listeners si es necesario
      socket.off(SOCKET_EMIT_EVENTS.GAME_CREATED);
    };
  }, [resetEffect, setGameCreated]);

  const handleStartGame = (): void => {
    console.log('Game start button pressed');
    socket.emit(SOCKET_EMIT_EVENTS.GAME_START);
    setResetEffect(prev => !prev);
    setGameEnded(false);
  };

  return (
    <div
      className="flex h-screen w-screen"
      style={{ backgroundImage: 'url(/images/background/adminScreenBG.webp)', backgroundSize: '100% 100%' }}
    >
      <div className="flex flex-col justify-start items-center h-full w-full">
        <div className="flex h-[70%] w-[95%] mb-3 mt-5">
          <BattleList />
        </div>
        <div className="flex h-[10%] w-[90%] mb-2">
          <div className='flex w-[50%] mr-1'>
            <MenuButton
              text="JOIN"
              onClick={joinBattle}
              disabled={!gameCreated || gameStarted}
              ariaDisabled={!gameCreated || gameStarted}
              extraStyles={
                !gameCreated || gameStarted
                  ? 'text-red-500 border-red-500'
                  : 'text-green-500 border-green-500'
              }
            />
          </div>
          <div className='flex w-[50%] ml-1'>
            <MenuButton
              text="START"
              onClick={handleStartGame}
              disabled={!gameCreated || gameStarted}
              ariaDisabled={false}
              extraStyles={
                !gameStarted && gameCreated
                  ? 'text-green-500 border-green-500'
                  : 'text-red-500 border-red-500'
              }
            />
          </div>
        </div>
        <div className="flex h-[10%] w-[90%] mt-2">
          <MenuButton
            text="Back to mode selection"
            onClick={returnToModeSelection}
            disabled={false}
            ariaDisabled={false}
            extraStyles=""
          />
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;