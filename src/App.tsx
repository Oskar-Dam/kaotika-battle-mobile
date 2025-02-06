import { useEffect, useState } from 'react';
import BattleScreen from './pages/BattleScreen.tsx';
import PWABadge from './PWABadge.tsx';
import LoginScreen from './pages/LoginScreen.tsx';
import { potions } from './data/data.ts';
import { listenToDisconnections } from './sockets/socketListeners.ts';
import { Player } from './interfaces/Player.ts';
import UnloggedDisconnectionModal from './components/UnloggedDisconnectionModal.tsx';
import LoggedDisconnectionModal from './components/LoggedDisconnectionModal.tsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [player, setPlayer] = useState<Player | null>(null);
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
  const [isDisconnected, setIsDisconnected] = useState<boolean>(false);
  const [PermanentlyDisconnected, setPermanentlyDisconnected] = useState<boolean>(false);

  useEffect(() => {
    const handleDisconnection = (disconnected: boolean) => {
      setIsDisconnected(disconnected);
      if (disconnected && isLoggedIn) {
        setPermanentlyDisconnected(true);
      }
    };
    listenToDisconnections(handleDisconnection);
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn && player ? (
        <BattleScreen
          potions={potions}
          player={player}
          setPlayer={setPlayer}
          isMyTurn={isMyTurn}
          setIsMyTurn={setIsMyTurn}
          setPlayer={setPlayer}
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

      {PermanentlyDisconnected && isLoggedIn && (
        <LoggedDisconnectionModal
          setPlayer={setPlayer}
          setIsLoggedIn={setIsLoggedIn}
          setEmail={setEmail}
        />
      )}

      {!isLoggedIn && isDisconnected && <UnloggedDisconnectionModal />}

      <PWABadge />
    </>
  );
}

export default App;
