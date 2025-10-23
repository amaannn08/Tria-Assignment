import React from 'react'
import SearchBar from './SearchBar'
import CreateContact from './CreateContact'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row gap-4 items-center justify-between fixed w-full top-0 left-0 h-20 bg-blue-500 shadow-md px-4 md:px-8 '>
        <div className='flex-1'><SearchBar/></div>
        <div><CreateContact/></div>
    </div>
  )
}

export default Header