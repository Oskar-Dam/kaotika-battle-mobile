import { useState } from 'react'
import BattleScreen from './pages/battleScreen.tsx'
import WaitingScreen from './components/Waiting.tsx'
import PWABadge from './PWABadge.tsx'
import LoginScreen from './pages/LoginScreen.tsx'
import { potions } from './data/data.ts'
import PlayerInterface from './interfaces/PlayerInterface.tsx'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [player, setPlayer] = useState<PlayerInterface | null>(null);

  player;

  isLoggedIn;
  setIsLoggedIn;

  const [showWaitingScreen, setShowWaitingScreen] = useState(false);
  console.log(setShowWaitingScreen);


  return (
    <>
      {showWaitingScreen && <WaitingScreen />}
      {isLoggedIn ? <BattleScreen potions={potions} />
        : <LoginScreen email={email} setEmail={setEmail} setIsLoggedIn={setIsLoggedIn} setPlayer={setPlayer}/>}
      <PWABadge />
    </>
  )
}

export default App
