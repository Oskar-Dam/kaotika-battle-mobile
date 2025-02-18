import { useEffect } from 'react';
import BattleScreen from './pages/BattleScreen';
import PWABadge from './PWABadge';
import LoginScreen from './pages/LoginScreen';
import { potions } from './data/data';
import { listenToDisconnections } from './sockets/socketListeners';
import UnloggedDisconnectionModal from './components/UnloggedDisconnectionModal';
import LoggedDisconnectionModal from './components/LoggedDisconnectionModal';
import useStore from './store/useStore';

const App: React.FC = () => {
  const {
    isLoggedIn,
    email,
    player,
    isMyTurn,
    isDisconnected,
    permanentlyDisconnected,
    setIsLoggedIn,
    setEmail,
    setPlayer,
    setIsMyTurn,
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
        <BattleScreen
          potions={potions}
          player={player}
          setPlayer={setPlayer}
          isMyTurn={isMyTurn}
          setIsMyTurn={setIsMyTurn}
          setIsLoggedIn={setIsLoggedIn}
          setEmail={setEmail}
        />
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
