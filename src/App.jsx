import { useState } from 'react'
import Compteur from './components/Compteur'
import ListGroup from './components/ListGroup'
import ColorBox from './components/ColorBox'
import ListeNote from './components/ListeNote'
function App() {
  let items = ["React", "Angular", "Vuejs"]
  let notes = [20, 15, 10, 5, 0]
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
      <ColorBox         initialColor="#ff0000"
        colorOptions={["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]}></ColorBox>
        <ListeNote notes={notes}></ListeNote>
    </>
  )
}

export default App
