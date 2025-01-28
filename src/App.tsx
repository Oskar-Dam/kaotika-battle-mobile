import { useEffect, useState } from 'react'
import BattleScreen from './pages/BattleScreen.tsx'
import WaitingScreen from './components/Waiting.tsx'
import PWABadge from './PWABadge.tsx'
import LoginScreen from './pages/LoginScreen.tsx'
import { potions } from './data/data.ts'
import PlayerInterface from './interfaces/PlayerInterface.tsx'



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [allPlayers, setAllPlayers] = useState<PlayerInterface[]>([]);
  const [player, setPlayer] = useState<PlayerInterface | null>(null);

  const [showWaitingScreen, setShowWaitingScreen] = useState<boolean>(false);
  console.log(setShowWaitingScreen);
  useEffect(() => {
    console.log("Players: ");
    console.log(allPlayers);
  }, [allPlayers]);

  return (
    <>
      {showWaitingScreen && isLoggedIn && <WaitingScreen />}
      {isLoggedIn ? <BattleScreen potions={potions} player={player}/>
        : <LoginScreen email={email} setEmail={setEmail} setIsLoggedIn={setIsLoggedIn} setPlayer={setPlayer}/>}
      <PWABadge />
    </>
  )
}

export default App
