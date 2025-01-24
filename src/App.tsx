import { useState } from 'react'
import PWABadge from './PWABadge.tsx'
import LoginScreen from './pages/LoginScreen.tsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  isLoggedIn;
  setIsLoggedIn;

  return (
    <>
      {isLoggedIn ? <h1>Logged in</h1> : <LoginScreen email={email} setEmail={setEmail} setIsLoggedIn={setIsLoggedIn}/>}
      <PWABadge />
    </>
  )
}

export default App
