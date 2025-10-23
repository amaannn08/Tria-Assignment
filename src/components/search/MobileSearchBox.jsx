import { UserSearch, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useContacts } from "../context/ContactsContext";
import SearchedContacts from './SearchedContacts';
import ContactDetailsModal from '../contacts/ContactDetailsModal';
import DeleteConfirmModal from '../ui/DeleteConfirmModal';

const MobileSearchBox = () => {
    const { contacts, setContacts } = useContacts();
    const [searchContacts, setSearchContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [allContacts, setAllContacts] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const inputRef = useRef(null);
    const [detailsModal, setDetailsModal] = useState({ isOpen: false, contact: null });
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, contactName: null });
    
    useEffect(() => {
        setAllContacts(contacts);
    }, [contacts]);
    
    const handleFocus = () => {
        setIsExpanded(true);
        inputRef.current?.focus();
    };

    const handleBlur = () => {
        // Delay clearing to allow click events to register
        setTimeout(() => {
            setIsExpanded(false);
            setSearchTerm("");
            setSearchContacts([]);
        }, 200);
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        if (value.trim() === "") {
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

    const clearSearch = (e) => {
        e.stopPropagation();
        setSearchTerm("");
        setSearchContacts([]);
    };

    const handleContactClick = (contact) => {
        setDetailsModal({ isOpen: true, contact });
        setSearchTerm("");
        setSearchContacts([]);
        setIsExpanded(false);
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
        <>
            {/* Search icon only - shown when not expanded */}
            {!isExpanded && (
                <button
                    onClick={handleFocus}
                    className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-xl transition-all duration-300 active:scale-95"
                    aria-label="Search contacts"
                >
                    <UserSearch className='text-gray-600 dark:text-gray-300 w-5 h-5' />
                </button>
            )}

            {/* Full-width search bar - shown when expanded */}
            {isExpanded && (
                <div className='fixed inset-0 z-50 bg-white dark:bg-gray-800 p-4'>
                    <div className='w-full relative'>
                        <div className="flex items-center w-full border h-12 px-4 rounded-xl bg-white dark:bg-gray-700 border-blue-500 dark:border-blue-400 shadow-lg">
                            <UserSearch className='text-gray-600 dark:text-gray-300 w-6 h-6' />
                            <input 
                                value={searchTerm}
                                onChange={handleSearch}
                                onBlur={handleBlur}
                                ref={inputRef}
                                type="text" 
                                placeholder='Search Contacts' 
                                className="w-full ml-3 text-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none bg-white dark:bg-gray-700"
                                autoFocus
                            />
                            {searchTerm && (
                                <div onClick={clearSearch} className='flex justify-center items-center hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-2 cursor-pointer transition-colors'>
                                    <X className='text-gray-600 dark:text-gray-300 w-5 h-5'/>
                                </div>
                            )}
                        </div>
                        
                        {/* Search results dropdown */}
                        <SearchedContacts 
                            searchContacts={searchContacts.slice(0, 8)} 
                            onContactClick={handleContactClick}
                        />
                    </div>
                </div>
            )}
            
            <ContactDetailsModal
                isOpen={detailsModal.isOpen}
                contact={detailsModal.contact}
                onClose={handleDetailsClose}
                onDelete={handleDetailsDelete}
                onToggleFavorite={handleToggleFavorite}
            />
            <DeleteConfirmModal
                isOpen={deleteModal.isOpen}
                contactName={deleteModal.contactName}
                onConfirm={handleDeleteConfirm}
                onClose={handleDeleteCancel}
            />
        </>
    );
};

export default MobileSearchBox;
