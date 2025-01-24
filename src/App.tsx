import { useState } from 'react'
import PWABadge from './PWABadge.tsx'
import LoginScreen from './pages/LoginScreen.tsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false)
  return (
    <>
      {isLoggedIn ? <h1>Logged in</h1> : <LoginScreen/>}
      <PWABadge />
    </>
  )
}

export default App
