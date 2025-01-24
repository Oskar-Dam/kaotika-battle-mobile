import { useState } from 'react'
import WaitingScreen from './components/Waiting.tsx'
// import BattleScreen from './pages/battleScreen.tsx'
import PWABadge from './PWABadge.tsx'
// import { potions } from './data/data.ts'

function App() {
  const [showWaitingScreen, setShowWaitingScreen] = useState(false);
  setShowWaitingScreen(false); // delete this line  when the setusestate is used 
  return (
    <>
      {showWaitingScreen && <WaitingScreen />}
      <h1 className=' text-6xl text-center'>kaotika-battle-mobile</h1>
      <PWABadge />
    </>
  )
}

export default App
