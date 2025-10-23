import { UserSearch,X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useContacts } from "../context/ContactsContext";
import SearchedContacts from './SearchedContacts';
const SearchBar = () => {
    const { contacts, setContacts } = useContacts();
    const [searchContacts,setSearchContacts]=useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [allContacts, setAllContacts] = useState([]);
    const [selected,setSelected]=useState(false);
    const inputRef=useRef(null);
    
    useEffect(() => {
        setAllContacts(contacts);
    }, [contacts]);
    
    const focusHandler=()=>{
        inputRef.current.focus();
        setSelected(true);
    };
    const blurHanlder=()=>{
        setSelected(false);
        setSearchTerm("");
        setSearchContacts([]);
    }
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        if(value.trim()===""){
            setSearchContacts([]);
            return;
        }
        const filtered = allContacts.filter(contact =>
        contact.name.toLowerCase().includes(value) ||
        contact.email.toLowerCase().includes(value) ||
        contact.phoneNumber.includes(value)
        );
        setSearchContacts(filtered); 
    };
    const clearSearch=(e)=>{
        setSearchTerm("");
        setSearchContacts([]);
    }
    return (
        <div className='w-full relative'>
            <div 
            onClick={focusHandler}
            className={`flex items-center w-full border h-10 md:h-12 px-2 rounded-xl pl-3 transition-all duration-300 ${selected ? "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600" : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600"}`}>
                <UserSearch className='text-gray-600 dark:text-gray-300 md:w-6 md:h-6' />
                <input 
                value={searchTerm}
                onChange={handleSearch}
                onBlur={blurHanlder}
                ref={inputRef}
                type="text" 
                placeholder='Search Contacts' 
                className={`w-[100%] ml-2 md:text-xl rounded-full text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none transition-all duration-300 ${selected ? "bg-white dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-700"}`}
                />
                <div onClick={clearSearch} className='flex justify-items-center hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-1 cursor-pointer transition-colors'>
                    <X className='text-gray-600 dark:text-gray-300 md:w-8 md:h-8'/>
                </div>
            </div>
            <SearchedContacts searchContacts={searchContacts.slice(0,5)}/>
        </div>
    )
}

export default SearchBar