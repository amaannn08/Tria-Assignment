import { useEffect, useState } from 'react'
import Header from './components/Header'
import Maincontent from './components/Maincontent'


function App() {
  return (
    <div className='w-full bg-white min-h-screen'>
      <Header/>
      <div className='pt-24 p-1 md:p-5'>
        <Maincontent/>
      </div>
    </div>  
  )
}

export default App
