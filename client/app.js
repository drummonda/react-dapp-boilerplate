import React from 'react'
import { Navbar } from './components/'
import Routes from './routes'

const App = () => {
  return (
    <div className='app-container'>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
