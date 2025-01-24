import { useState } from 'react'
import WaitingScreen from './components/Waiting.tsx'
import PWABadge from './PWABadge.tsx'

function App() {
  const [showWaitingScreen, setShowWaitingScreen] = useState(false);
  return (
    <>
      {showWaitingScreen && <WaitingScreen />}
      <h1 className=' text-6xl text-center'>kaotika-battle-mobile</h1>
      <PWABadge />
    </>
  )
}

export default App
