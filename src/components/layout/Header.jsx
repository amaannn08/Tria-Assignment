import React from 'react'
import { Link } from 'react-router-dom'
import { UserCircle2 } from 'lucide-react'
import SearchBar from '../search/SearchBar'
import CreateContactButton from '../ui/CreateContactButton'
import ThemeToggle from '../ui/ThemeToggle'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row items-center fixed w-full top-0 left-0 md:h-20 bg-gray-100 dark:bg-gray-800 shadow-md px-4 md:px-8 py-3 md:py-0 gap-3 md:gap-4 z-50 transition-colors duration-300'>
        {/* Logo/Brand */}
        <Link to="/" className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
          <UserCircle2 className='w-8 h-8 text-blue-600 dark:text-blue-400' />
          <h1 className='text-xl md:text-2xl font-bold text-gray-800 dark:text-white'>Contacts</h1>
        </Link>
        
        {/* Search Bar */}
        <div className='flex-1 w-full md:w-auto'><SearchBar/></div>
        
        {/* Theme Toggle */}
        <div className='flex items-center gap-3'>
          <ThemeToggle />
          {/* Desktop Create Button */}
          <div className='hidden md:block'><CreateContactButton/></div>
        </div>
    </div>
  )
}

export default Header