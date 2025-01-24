import BattleScreen from './pages/battleScreen.tsx'
import PWABadge from './PWABadge.tsx'
import { potions } from './data/data.ts'

function App() {
  return (
    <>

      <BattleScreen potions={potions}>

      </BattleScreen>
      <PWABadge />
    </>
  )
}

export default App
