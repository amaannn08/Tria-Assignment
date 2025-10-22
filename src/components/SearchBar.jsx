import { UserSearch } from 'lucide-react';
import { useRef } from 'react';
const SearchBar = () => {
    const inputRef=useRef(null);
    const focusHandler=()=>{
        inputRef.current.focus();
    };
    return (
        <div 
        onClick={focusHandler}
        className='flex items-center w-full md:w-[50%] bg-[#333439] h-10 md:h-12 px-2 rounded-full pl-3'>
            <UserSearch className=' text-gray-400 md:w-6 md:h-6' />
            <input 
                ref={inputRef}
                type="text" 
                placeholder='Search Contacts' 
                className='w-full ml-2 md:text-xl rounded-full bg-[#333439] px-2 text-white placeholder-gray-400 outline-none'
            />
</div>

  )
}

export default SearchBar