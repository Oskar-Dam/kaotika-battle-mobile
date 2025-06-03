import React, { useEffect, useRef } from 'react';
import MenuButton from '../components/MenuButton';
import SettingModal from '../components/SettingsModal';
import { SOCKET_EMIT_EVENTS } from '../sockets/events';
import socket from '../sockets/socket';
import useStore from '../store/useStore';

const ModeSelection: React.FC = () => {

  const videoRef = useRef<HTMLVideoElement>(null);

  const { setIsBattleSelected, isSettingModalOpen, setIsSettingModalOpen, player } = useStore();

  const selectBattleMode = () => {
    setIsBattleSelected(true);
    console.log('Battle mode selected');
    
  };

  const selectAdventureMode = () => {
    console.log('Adventure mode selected, comming soon...');
    
  };

  const handleLogOut = () => {
    console.log('Log out');
    localStorage.removeItem('playerEmail');
    window.location.reload();
  };

  const handleSettingsOnClick = () => {    
    setIsSettingModalOpen(true);
  };

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


  const buttons = [
    { id: 'selectBattle', component: <MenuButton
      text='Battle'
      onClick={selectBattleMode}
      disabled={false}
      ariaDisabled={false}
      extraStyles=''/> },
    { id: 'selectAdventure', component: <MenuButton
      text='Adventure'
      onClick={selectAdventureMode}
      disabled={false}
      ariaDisabled={false}
      extraStyles='brightness-40'/> },
    { id: 'log-out', component: <MenuButton
      text='Log Out'
      onClick={handleLogOut}
      disabled={false}
      ariaDisabled={false}
      extraStyles=''/> },
    ...(player.role === 'mortimer'|| player.role === 'villain' ? [{
      id: 'settings',
      component: <MenuButton
        text='Settings'
        onClick={handleSettingsOnClick}
        disabled={false}
        ariaDisabled={false}
        extraStyles=''/>
    }] : [])
  ];
  
  

  return (
    <div
      className="flex flex-col justify-center items-center h-screen p-4 bg-black text-white text-2xl font-bold w-screen"
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

      <div className={`flex flex-col items-center gap-6 p-3 w-full overflow-y-auto pr-3 z-10 mt-5 ${buttons.length <= 5 ? 'justify-between h-[70%] ' : 'h-[90%] border-2 border-white rounded-lg'}`}>
        {buttons.map(({ id, component }) => (
          <div
            key={id}
            className="flex items-center justify-center w-full h-[15%] min-h-[15%]">
            {component}
          </div>
        ))}
      </div>

      {isSettingModalOpen && (
        <SettingModal />
      )}
    </div>
  );
};

export default ModeSelection;
