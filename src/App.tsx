import { useEffect } from 'react';
import AdminScreen from './components/AdminScreen';
import LoggedDisconnectionModal from './components/LoggedDisconnectionModal';
import UnloggedDisconnectionModal from './components/UnloggedDisconnectionModal';
import AcolyteLobby from './pages/AcolyteLobbyScreen';
import BattleScreen from './pages/BattleScreen';
import LoginScreen from './pages/LoginScreen';
import PWABadge from './PWABadge';
import { listenToDisconnections, listenToJoinedToBattle } from './sockets/socketListeners';
import useStore from './store/useStore';

const App: React.FC = () => {
  const {
    isLoggedIn,
    player,
    isDisconnected,
    permanentlyDisconnected,
    gameJoined,
    setGameJoined,
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
    listenToJoinedToBattle(setGameJoined, player);
  }, []);

  return (
    <>
    
    
      {isLoggedIn && player && gameJoined && <BattleScreen/>}

      {isLoggedIn && player && !gameJoined && player.role === 'acolyte' && <AcolyteLobby/>}

      {isLoggedIn && player && !gameJoined && (player.role === 'mortimer' || player.role === 'villain') && <AdminScreen/>}

      {!isLoggedIn && !player && !gameJoined &&
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
