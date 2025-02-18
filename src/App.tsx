import { useEffect } from 'react';
import BattleScreen from './pages/BattleScreen';
import PWABadge from './PWABadge';
import LoginScreen from './pages/LoginScreen';
import { listenToDisconnections } from './sockets/socketListeners';
import UnloggedDisconnectionModal from './components/UnloggedDisconnectionModal';
import LoggedDisconnectionModal from './components/LoggedDisconnectionModal';
import useStore from './store/useStore';

const App: React.FC = () => {
  const {
    isLoggedIn,
    email,
    player,
    isDisconnected,
    permanentlyDisconnected,
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
      {isLoggedIn && player ? (
        <BattleScreen/>
      ) : (
        <LoginScreen
          email={email}
          setEmail={setEmail}
          setIsLoggedIn={setIsLoggedIn}
          setPlayer={setPlayer}
        />
      )}

      {permanentlyDisconnected && isLoggedIn && (
        <LoggedDisconnectionModal
          setPlayer={setPlayer}
          setIsLoggedIn={setIsLoggedIn}
          setEmail={setEmail}
          setPermanentlyDisconnected={setPermanentlyDisconnected}
        />
      )}

      {!isLoggedIn && isDisconnected && <UnloggedDisconnectionModal />}

      <PWABadge />
    </>
  );
};

export default App;
