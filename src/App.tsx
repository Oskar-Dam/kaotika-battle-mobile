
import BattleScreen from './pages/battleScreen.tsx'
import { useState } from 'react'
import WaitingScreen from './components/Waiting.tsx'
import PWABadge from './PWABadge.tsx'
import { potions } from './data/data.ts'

function App() {
  const [showWaitingScreen, setShowWaitingScreen] = useState(true);
  console.log(setShowWaitingScreen);
  return (
    <>
      {showWaitingScreen && <WaitingScreen />}
      <BattleScreen potions={potions} />
      <h1 className=' text-6xl text-center'>kaotika-battle-mobile</h1>
      <PWABadge />
    </>
  )
}

export default App
