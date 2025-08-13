import React from 'react'
import Home from './pages/Home'
import SecondPart from './components/SecondPart'

function App() {
  return (
    <div className='flex gap-5 pt-10 container mx-auto'>
      <div className='w-3/4'>
        <Home />
      </div>
      <div className='w-1/4'>
        <SecondPart />
      </div>
    </div>
  )
}

export default App
