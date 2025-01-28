import { useEffect, useState } from 'react'
import BattleScreen from './pages/battleScreen.tsx'
import WaitingScreen from './components/Waiting.tsx'
import PWABadge from './PWABadge.tsx'
import LoginScreen from './pages/LoginScreen.tsx'
import { potions } from './data/data.ts'
import PlayerInterface from './interfaces/PlayerInterface.tsx'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [allPlayers, setAllPlayers] = useState<PlayerInterface[]>([]);

  isLoggedIn;
  setIsLoggedIn;

  const [showWaitingScreen, setShowWaitingScreen] = useState<boolean>(false);
  console.log(setShowWaitingScreen);
  useEffect(() => {
    console.log("Players: ");
    console.log(allPlayers);
  }, [allPlayers]);

  return (
    <>
      {showWaitingScreen && isLoggedIn && <WaitingScreen setAllPlayers={setAllPlayers} />}
      {isLoggedIn ? <BattleScreen potions={potions} />
        : <LoginScreen email={email} setEmail={setEmail} setIsLoggedIn={setIsLoggedIn} />}
      <PWABadge />
    </>
  )
}

export default App
