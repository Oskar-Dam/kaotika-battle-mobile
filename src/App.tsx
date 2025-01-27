import { useState } from 'react'
import BattleScreen from './pages/battleScreen.tsx'
import WaitingScreen from './components/Waiting.tsx'
import PWABadge from './PWABadge.tsx'
import LoginScreen from './pages/LoginScreen.tsx'
import { potions } from './data/data.ts'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  isLoggedIn;
  setIsLoggedIn;

  const [showWaitingScreen, setShowWaitingScreen] = useState(false);
  console.log(setShowWaitingScreen);
  return (
    <>
      {showWaitingScreen && <WaitingScreen/>}
      {isLoggedIn ? <BattleScreen potions={potions}/>
      : <LoginScreen email={email} setEmail={setEmail} setIsLoggedIn={setIsLoggedIn}/>}
      <PWABadge />
    </>
  )
}

export default App
