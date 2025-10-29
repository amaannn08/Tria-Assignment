import { UserSearch,X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useContacts } from "../context/ContactsContext";
import SearchedContacts from './SearchedContacts';
import ContactDetailsModal from '../contacts/ContactDetailsModal';
import DeleteConfirmModal from '../ui/DeleteConfirmModal';
import { useCreateContact } from '../context/CreateContactContext';
const SearchBar = () => {
    const { contacts, setContacts } = useContacts();
    const { openEditModal } = useCreateContact();
    const [searchContacts,setSearchContacts]=useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [allContacts, setAllContacts] = useState([]);
    const [selected,setSelected]=useState(false);
    const inputRef=useRef(null);
    const [detailsModal, setDetailsModal] = useState({ isOpen: false, contact: null });
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, contactName: null });
    
    useEffect(() => {
        setAllContacts(contacts);
    }, [contacts]);
    
    const focusHandler=()=>{
        inputRef.current.focus();
        setSelected(true);
    };
    const blurHanlder=()=>{
        // Delay clearing to allow click events to register
        setTimeout(() => {
            setSelected(false);
            setSearchTerm("");
            setSearchContacts([]);
        }, 200);
    }
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        if(value.trim()===""){
            setSearchContacts([]);
            return;
        }
        const filtered = allContacts.filter(contact => {
            const nameMatch = contact.name.toLowerCase().replace(/\s+/g).includes(value.trim());
            const emailMatch = contact.emails?.some(email => email.toLowerCase().includes(value)) || 
                             (contact.email && contact.email.toLowerCase().includes(value));
            const phoneMatch = contact.phoneNumbers?.some(phone => phone.includes(value)) || 
                             (contact.phoneNumber && contact.phoneNumber.includes(value));
            return nameMatch || emailMatch || phoneMatch;
        });
        setSearchContacts(filtered); 
    };
    const clearSearch=(e)=>{
        setSearchTerm("");
        setSearchContacts([]);
    }

    const handleContactClick = (contact) => {
        setDetailsModal({ isOpen: true, contact });
        setSearchTerm("");
        setSearchContacts([]);
        setSelected(false);
    };

    const handleDetailsClose = () => {
        setDetailsModal({ isOpen: false, contact: null });
    };

    const handleDetailsDelete = (name) => {
        setDeleteModal({ isOpen: true, contactName: name });
        setDetailsModal({ isOpen: false, contact: null });
    };

    const handleDeleteConfirm = () => {
        if (deleteModal.contactName) {
            const updatedContacts = contacts.filter(c => c.name !== deleteModal.contactName);
            setContacts(updatedContacts);
        }
        setDeleteModal({ isOpen: false, contactName: null });
    };

    const handleDeleteCancel = () => {
        setDeleteModal({ isOpen: false, contactName: null });
    };

    const handleToggleFavorite = (name) => {
        const index = contacts.findIndex(c => c.name === name);
        if (index !== -1) {
            const updatedContacts = [...contacts];
            updatedContacts[index] = {
                ...updatedContacts[index],
                favourite: updatedContacts[index].favourite === "Yes" ? "No" : "Yes"
            };
            setContacts(updatedContacts);
        }
    };
    return (
        <div className='w-full relative'>
            <div 
            onClick={focusHandler}
            className={`flex items-center w-[60%] border h-10 md:h-12 px-2 rounded-xl pl-3 transition-all duration-300 ${selected ? "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600" : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600"}`}>
                <UserSearch className='text-gray-600 dark:text-gray-300 md:w-6 md:h-6' />
                <input 
                value={searchTerm}
                onChange={handleSearch}
                onBlur={blurHanlder}
                ref={inputRef}
                type="text" 
                placeholder='Search Contacts' 
                className={`w-[100%] ml-2 md:text-xl rounded-full text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none transition-all duration-300 
                    
                    ${inputRef ? "text-gray-900":"text-gray-100"}
                    
                    ${selected ? "bg-white dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-700"}`}
                />
                <div onClick={clearSearch} className='flex justify-items-center hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-1 cursor-pointer transition-colors'>
                    <X className='text-gray-600 dark:text-gray-300 md:w-8 md:h-8'/>
                </div>
            </div>
            <SearchedContacts 
                searchContacts={searchContacts.slice(0,5)} 
                onContactClick={handleContactClick}
            />
            <ContactDetailsModal
                isOpen={detailsModal.isOpen}
                contact={detailsModal.contact}
                onClose={handleDetailsClose}
                onDelete={handleDetailsDelete}
                onToggleFavorite={handleToggleFavorite}
                onEdit={openEditModal}
            />
            <DeleteConfirmModal
                isOpen={deleteModal.isOpen}
                contactName={deleteModal.contactName}
                onConfirm={handleDeleteConfirm}
                onClose={handleDeleteCancel}
            />
        </div>
    )
}

export default SearchBar