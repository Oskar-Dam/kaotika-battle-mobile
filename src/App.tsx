import { useEffect, useState } from 'react'
import BattleScreen from './pages/BattleScreen.tsx'
import PWABadge from './PWABadge.tsx'
import LoginScreen from './pages/LoginScreen.tsx'
import { potions } from './data/data.ts'
import PlayerInterface from './interfaces/PlayerInterface.tsx'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [player, setPlayer] = useState<PlayerInterface | null>(null);
  const [allPlayers, setAllPlayers] = useState<PlayerInterface[]>([]);
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);

  useEffect(() => {
    console.log("Players: ");
    console.log(allPlayers);
  }, [allPlayers]);

  return (
    <>
      {isLoggedIn ? <BattleScreen potions={potions} player={player} setAllPlayers={setAllPlayers}/>
        : <LoginScreen email={email} setEmail={setEmail} setIsLoggedIn={setIsLoggedIn} setPlayer={setPlayer}/>}
      <PWABadge />
    </>
  )
}

export default App
