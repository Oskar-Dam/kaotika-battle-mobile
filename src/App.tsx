import { useEffect } from 'react';
import LoggedDisconnectionModal from './components/LoggedDisconnectionModal';
import UnloggedDisconnectionModal from './components/UnloggedDisconnectionModal';
import AcolyteLobby from './pages/AcolyteLobbyScreen';
import BattleScreen from './pages/BattleScreen';
import LoginScreen from './pages/LoginScreen';
import PWABadge from './PWABadge';
import { listenToDisconnections, listenToJoinedToBattle } from './sockets/socketListeners';
import useStore from './store/useStore';
import AdminScreen from './components/AdminScreen';

const App: React.FC = () => {
  const {
    isLoggedIn,
    email,
    player,
    isDisconnected,
    permanentlyDisconnected,
    gameJoined,
    setGameJoined,
    setIsLoggedIn,
    setEmail,
    setPlayer,
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
  }, [listenToJoinedToBattle]);

  return (
    <>
    
    
      {isLoggedIn && player && gameJoined && <BattleScreen/>}

      {isLoggedIn && player && !gameJoined && player.role === 'acolyte' && <AcolyteLobby/>}

      {isLoggedIn && player && !gameJoined && (player.role === 'mortimer' || player.role === 'villain') && <AdminScreen/>}

      {!isLoggedIn && !player && !gameJoined &&
        <LoginScreen
          email={email}
          setEmail={setEmail}
          setIsLoggedIn={setIsLoggedIn}
          setPlayer={setPlayer}
        />
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
