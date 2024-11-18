import React from 'react'
import './App.css'
import ThreeScene from './components/ThreeScene'
import { AboutMePage } from './components/aboutMePage/AboutMePage'

function App() {

  const [displayMePage, setDisplayMePage] = React.useState(false)

  return (
    <div className='test'>
      <AboutMePage display={displayMePage} />
      <ThreeScene />
    </div>
  )
}

export default App
