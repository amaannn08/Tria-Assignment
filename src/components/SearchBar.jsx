import { UserSearch,X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useContacts } from "./ContactsContext";
const SearchBar = () => {
    const { contacts, setContacts } = useContacts();
    const [searchContacts,setSearchContacts]=useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [allContacts, setAllContacts] = useState([]);
    const inputRef=useRef(null);
    
    useEffect(() => {
        setAllContacts(contacts);
    }, []);
    
    const focusHandler=()=>{
        inputRef.current.focus();
    };
    
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
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
        <div className='w-full'>
            <div 
            onClick={focusHandler}
            className='flex items-center w-full bg-gray-100 border border-gray-300 h-10 md:h-12 px-2 rounded-xl pl-3'>
                <UserSearch className=' text-gray-600 md:w-6 md:h-6' />
                <input 
                value={searchTerm}
                onChange={handleSearch}
                ref={inputRef}
                type="text" 
                placeholder='Search Contacts' 
                className='w-[100%] ml-2 md:text-xl rounded-full bg-gray-100 px-2 text-gray-900 placeholder-gray-500 outline-none'
                />
                <div onClick={clearSearch} className='flex justify-items-center hover:bg-gray-300 rounded-full p-1 cursor-pointer'>
                    <X className='text-gray-600 md:w-8 md:h-8'/>
                </div>
            </div>
            <div>
                {searchContacts.map((item)=>(
                <div className='flex flex-row items-center gap-4'>
                    <div className="w-10 md:w-15 h-10 md:h-15 flex items-center justify-center">
                        <div
                            className={`w-8 md:w-10 h-8 md:h-10 rounded-full ${item.color} flex items-center justify-center text-white font-bold "md:group-hover:hidden"}`}
                                >
                             {item.name.charAt(0)}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-gray-900">{item.name}</h1>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default SearchBar