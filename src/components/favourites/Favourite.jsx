import { Star,ChevronDown,ChevronUp } from 'lucide-react'
import {React,useState} from 'react'
import FavouriteList from './FavouriteList';
import { useContacts } from "../context/ContactsContext";

const Favourite = () => {
    const { contacts, setContacts } = useContacts();
    const [selected,setSelected]=useState(false);
    function focusHandler(){
        setSelected(prev=>!prev);
    }
    return (
        <div >
            <div onClick={focusHandler}
                className='w-[40%] md:w-[25%] flex flex-row items-center gap-2 mt-4 ml-2 cursor-pointer group'>
                <Star className='text-gray-700 dark:text-gray-300 fill-gray-700 dark:fill-gray-300 w-5 h-4 transition-colors'/>
                <div className='flex flex-row items-center'>
                    <h1 className='text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>Favourites</h1>
                    <h1 className='text-gray-700 dark:text-gray-400 p-1 text-sm'>({contacts.filter(c=>c.favourite==="Yes").length})</h1>
                </div>
                <div className='transition-all duration-600'>
                    {selected===true?<ChevronDown className='text-gray-700 dark:text-gray-300 w-6 h-5' />:<ChevronUp className='text-gray-700 dark:text-gray-300 w-6 h-5' />}
                </div>
            </div>
            <div className='transition-all duration-1000'>
                {selected===true?<FavouriteList/> :null}
            </div>           
        </div>
    )
}

export default Favourite