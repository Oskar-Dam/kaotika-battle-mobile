import { useEffect } from 'react';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import useStore from '../store/useStore';
import MenuButton from './MenuButton';


// the Waiting component is a modal that displays a spinner and a message while waiting for the game to start(mortimer) or if you are mortimer, you can start the game
interface SettingModalProps { }

const SettingModal: React.FC<SettingModalProps> = () => {

  useEffect(() => {
    socket.emit(SOCKET_EMIT_EVENTS.GAME_STARTED);
    socket.emit(SOCKET_EMIT_EVENTS.GAME_CREATED);
    console.log('sended game is created and game started socket');
  }, []);

  const {
    setIsSettingModalOpen, gameStarted, gameCreated,
  } = useStore();

  const handleCloseOnClick = () => {
    setIsSettingModalOpen(false);
  };

  const handleReconnect = () => {
    socket.emit(SOCKET_EMIT_EVENTS.GAME_RESET);
  };

  const handleStartGame = (): void => {
    console.log('Game start button pressed');
    socket.emit(SOCKET_EMIT_EVENTS.GAME_START);
  };

  const buttons = [
    { id: 'resetGame', component: <MenuButton
      text='Reset Game'
      onClick={handleReconnect}
      disabled={gameCreated || !gameStarted}
      ariaDisabled={false}
      extraStyles={gameCreated ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}/> },
    { id: 'startGame', component: <MenuButton
      text='Start Game'
      onClick={handleStartGame}
      disabled={!gameCreated || gameStarted}
      ariaDisabled={false}
      extraStyles={!gameStarted ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}/> },
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