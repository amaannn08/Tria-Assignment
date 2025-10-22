import { useState } from 'react'
import SearchBar from './components/SearchBar'
import CreateContact from './components/CreateContact'
import Maincontent from './components/Maincontent'

function App() {

  return (
    <div className='w-full bg-[#1e1f24] min-h-screen p-[5%] md:p-[3%]'>
      <div className='flex flex-col items-center md:flex-row md:items-center'>
        <SearchBar/>
        <CreateContact/>
      </div>
      <Maincontent/>
    </div>  
  )
}

export default App
