import { useState } from 'react'
import Compteur from './components/Compteur'
import ListGroup from './components/ListGroup'
function App() {
  let items = ["React", "Angular", "Vuejs"]
  const handelSelectedItem = (item) => {
    console.log(item);
  };

  return (
    <>
    <Compteur count={0} step={6}/>
          <ListGroup
        initialItems={items}
        heading="Liste :"
        onSelectedItem={handelSelectedItem}
        placeholder="Enter un nouveaux Element"
      />
    </>
  )
}

export default App
