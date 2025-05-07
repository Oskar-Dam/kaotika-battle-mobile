import { useEffect, useState } from 'react';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import { clearListenToServerEventsApp, listenToGameCreated, listenToGameStarted } from '../sockets/socketListeners';
import useStore from '../store/useStore';
import MenuButton from './MenuButton';

interface SettingModalProps { }

const SettingModal: React.FC<SettingModalProps> = () => {
  const [resetEffect, setResetEffect] = useState(false); // 1. Crear el estado que controlará la ejecución del useEffect

  const {
    setIsSettingModalOpen,
    gameStarted,
    gameCreated,
    setGameCreated,
    setGameStarted,
    gameEnded,
  } = useStore();

  // 2. Ejecutar useEffect cada vez que `resetEffect` cambie
  useEffect(() => {
    socket.emit(SOCKET_EMIT_EVENTS.GAME_STARTED);
    socket.emit(SOCKET_EMIT_EVENTS.GAME_CREATED);
    console.log('sended game is created and game started socket');

    listenToGameCreated(setGameCreated);
    listenToGameStarted(setGameStarted);
    console.log('listening to game created and game started');

    return () => {
      clearListenToServerEventsApp();
    };
  }, [resetEffect]); // 3. Añadir el estado resetEffect como dependencia para que el efecto se ejecute cuando cambie

  console.log('Game created:', gameCreated);
  console.log('Game started:', gameStarted);
  console.log('Game ended:', gameEnded);
  

  // 4. Función que cambiará el estado resetEffect al presionar un botón
  const handleReconnect = () => {
    console.log('Game reset button pressed');
    socket.emit(SOCKET_EMIT_EVENTS.GAME_RESET);
    setResetEffect(prev => !prev);  // 5. Cambiar el estado para que el useEffect se ejecute nuevamente
  };

  const handleStartGame = (): void => {
    console.log('Game start button pressed');
    socket.emit(SOCKET_EMIT_EVENTS.GAME_START);
    setResetEffect(prev => !prev);  // 6. Cambiar el estado para que el useEffect se ejecute nuevamente
  };

  const handleCloseOnClick = () => {
    setIsSettingModalOpen(false);
  };

  const buttons = [
    { id: 'resetGame', component: <MenuButton
      text='Reset Game'
      onClick={handleReconnect}
      disabled={!gameStarted || !gameEnded}
      ariaDisabled={false}
      extraStyles={gameStarted || gameEnded ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}/> },
    { id: 'startGame', component: <MenuButton
      text='Start Game'
      onClick={handleStartGame}
      disabled={!gameCreated || gameStarted}
      ariaDisabled={false}
      extraStyles={!gameStarted && gameCreated ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}/> },
    { id: 'closeSettings', component: <MenuButton
      text='Close'
      onClick={handleCloseOnClick}
      disabled={false}
      ariaDisabled={false}
      extraStyles=''/> },
  ];

  return (
    <div
      className="w-full flex flex-col fixed inset-0 items-center justify-center z-55 grid-col-1 grid-row-3 place-self-center h-screen bg-black/90 overflow-y-hidden "
      data-testid="setting-modal"
    >
      <div className='h-[70%] flex flex-col items-center justify-between'>
        <img
          src={'/images/settings-button.webp'}
          alt={'settings'}
          className="place-self-center"
        />
        
        <div className={`flex flex-col items-center gap-6 p-3 w-full overflow-y-auto pr-3 z-10 mt-5 ${buttons.length <= 5 ? 'justify-between h-[70%] ' : 'h-[90%] border-2 border-white rounded-lg'}`}>
          {buttons.map(({ id, component }) => (
            <div
              key={id}
              className="flex items-center justify-center w-full h-[20%] min-h-[20%]">
              {component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingModal;

