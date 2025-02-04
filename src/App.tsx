import { useEffect, useState } from 'react';
import BattleScreen from './pages/BattleScreen.tsx';
import PWABadge from './PWABadge.tsx';
import LoginScreen from './pages/LoginScreen.tsx';
import { potions } from './data/data.ts';
import DisconnectionModal from './components/DisconnectionModal.tsx';
import { listenToDisconnections } from './sockets/socketListeners.ts';
import { Player } from './interfaces/Player.ts';


function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [player, setPlayer] = useState<Player | null>(null);
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
  const [disconnection, setDisconnection] = useState<boolean>(true);

  useEffect(() => {
    listenToDisconnections(setDisconnection);
  }, []);

  return (
    <>
      {isLoggedIn && player ? (
        <BattleScreen
          potions={potions}
          player={player}
          isMyTurn={isMyTurn}
          setIsMyTurn={setIsMyTurn} 
        />)
        :
        <LoginScreen
          email={email}
          setEmail={setEmail}
          setIsLoggedIn={setIsLoggedIn}
          setPlayer={setPlayer} 
        />}
          
      {disconnection && <DisconnectionModal /> }
      <PWABadge />
    </>
  );
}

export default App;
