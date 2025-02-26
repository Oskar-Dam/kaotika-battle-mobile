import { useEffect } from 'react';
import AdminScreen from './components/AdminScreen';
import LoggedDisconnectionModal from './components/LoggedDisconnectionModal';
import UnloggedDisconnectionModal from './components/UnloggedDisconnectionModal';
import AcolyteLobby from './pages/AcolyteLobbyScreen';
import BattleScreen from './pages/BattleScreen';
import LoginScreen from './pages/LoginScreen';
import ModeSelection from './pages/ModeSelectionScreen';
import PWABadge from './PWABadge';
import { listenToDisconnections, listenToGameCreated, listenToGameStarted } from './sockets/socketListeners';
import useStore from './store/useStore';

const App: React.FC = () => {
  const {
    isLoggedIn,
    player,
    isDisconnected,
    isBattleSelected,
    isAdventureSelected,
    permanentlyDisconnected,
    gameJoined,
    setGameStarted,
    setGameCreated,
    setIsDisconnected,
    setPermanentlyDisconnected,
  } = useStore();

  useEffect(() => {
    const handleDisconnection = (disconnected: boolean) => {
      setIsDisconnected(disconnected);
      if (disconnected && isLoggedIn) {
        setPermanentlyDisconnected(true);
      }
    };
    listenToDisconnections(handleDisconnection);
  }, [isLoggedIn, setIsDisconnected, setPermanentlyDisconnected]);

  useEffect(() => {
    listenToGameCreated(setGameCreated);
  }
  , []);

  useEffect(() => {
    listenToGameStarted(setGameStarted);
  }
  , []);

  return (
    <>
    
      {isLoggedIn && !isBattleSelected && !isAdventureSelected && player && !gameJoined && <ModeSelection/>}
    
      {isLoggedIn && isBattleSelected && player && gameJoined && <BattleScreen/>}

      {isLoggedIn && isBattleSelected && player && !gameJoined && player.role === 'acolyte' && <AcolyteLobby/>}

      {isLoggedIn && isBattleSelected && player && !gameJoined && (player.role === 'mortimer' || player.role === 'villain') && <AdminScreen/>}

      {!isLoggedIn && !player &&
        <LoginScreen />
      }

      {permanentlyDisconnected && isLoggedIn && (
        <LoggedDisconnectionModal />
      )}

      {!isLoggedIn && isDisconnected && <UnloggedDisconnectionModal />}

      <PWABadge />
    </>
  );
};

export default App;
