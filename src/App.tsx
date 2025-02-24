import { useEffect } from 'react';
import LoggedDisconnectionModal from './components/LoggedDisconnectionModal';
import UnloggedDisconnectionModal from './components/UnloggedDisconnectionModal';
import AcolyteLobby from './pages/AcolyteLobbyScreen';
import BattleScreen from './pages/BattleScreen';
import LoginScreen from './pages/LoginScreen';
import PWABadge from './PWABadge';
import { listenToDisconnections } from './sockets/socketListeners';
import useStore from './store/useStore';

const App: React.FC = () => {
  const {
    isLoggedIn,
    email,
    player,
    isDisconnected,
    permanentlyDisconnected,
    gameSelected,
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

  return (
    <>
    
    
      {isLoggedIn && player && gameSelected && <BattleScreen/>}

      {isLoggedIn && player && !gameSelected && <AcolyteLobby/>}

      {!isLoggedIn && !player && !gameSelected &&
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
