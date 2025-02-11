import { useState } from 'react'
import Compteur from './components/Compteur'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Compteur count={0}/>
    </>
  )
}

export default App
