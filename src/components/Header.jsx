import React from 'react'
import SearchBar from './SearchBar'
import CreateContact from './CreateContact'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row items-center fixed w-full top-0 left-0 h- md:h-20 bg-gray-100 shadow-md px-4 md:px-8 h-32'>
        <div className='md:flex-1 w-full pt-4 md:pt-0'><SearchBar/></div>
        <div className='w-full md:w-10'><CreateContact/></div>
    </div>
  )
}

export default Header