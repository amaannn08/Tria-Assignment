import React from 'react'
import { Link } from 'react-router-dom'
import { UserCircle2 } from 'lucide-react'
import SearchBar from '../search/SearchBar'
import MobileSearchBox from '../search/MobileSearchBox'
import CreateContactButton from '../ui/CreateContactButton'

const Header = () => {
  return (
    <div className='flex flex-row items-center fixed w-full top-0 left-0 md:h-20 bg-gray-100 dark:bg-gray-800 shadow-md px-4 md:px-8 py-3 md:py-0 gap-3 md:gap-4 z-50 transition-colors duration-300'>
        <Link to="/" className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
          <UserCircle2 className='w-8 h-8 text-blue-600 dark:text-blue-400' />
          <h1 className='text-xl md:text-2xl font-bold text-gray-800 dark:text-white'>Contacts</h1>
        </Link>
        <div className='flex-1 w-full md:w-auto'>
          <div className='hidden md:block'><SearchBar/></div>
          <div className='flex items-center justify-end md:hidden'><MobileSearchBox/></div>
        </div>
        <div className='flex items-center gap-3'>
          <div className='hidden md:block'><CreateContactButton/></div>
        </div>
    </div>
  )
}

export default Header