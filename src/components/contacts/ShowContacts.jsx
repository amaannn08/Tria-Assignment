import React, { useState } from 'react'
import { useContacts } from "../context/ContactsContext";
import { Pencil, Square, SquareCheck, Star, Trash2 } from 'lucide-react';
import { useSelected } from "../context/SelectedContext";
import { useNavigate } from 'react-router-dom';
import DeleteConfirmModal from '../ui/DeleteConfirmModal';
import EmptyState from '../ui/EmptyState';
import ContactDetailsModal from './ContactDetailsModal';

const ShowContacts = ({ sortOption = 'name-asc', onEditContact }) => {
  const { contacts, setContacts } = useContacts();
  const { selected, setSelected } = useSelected();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, contactName: null });
  const [detailsModal, setDetailsModal] = useState({ isOpen: false, contact: null });
  
    function favChange(name) {
      const index = contacts.findIndex(c => c.name === name);
      if (index !== -1) {
        const updatedContacts = [...contacts];
        updatedContacts[index] = {
          ...updatedContacts[index],
          favourite: updatedContacts[index].favourite === "Yes" ? "No" : "Yes"
        };
        setContacts(updatedContacts);
      }
    }
  
    function onSelectHandler(name) {
      if (selected.includes(name)) {
        setSelected(prev => prev.filter(n => n !== name));
      } else {
        setSelected(prev => [...prev, name]);
      }
    }

    function handleDeleteClick(name) {
      setDeleteModal({ isOpen: true, contactName: name });
    }

    function handleDeleteConfirm() {
      if (deleteModal.contactName) {
        const updatedContacts = contacts.filter(c => c.name !== deleteModal.contactName);
        setContacts(updatedContacts);
        setSelected(prev => prev.filter(n => n !== deleteModal.contactName));
      }
      setDeleteModal({ isOpen: false, contactName: null });
    }

    function handleDeleteCancel() {
      setDeleteModal({ isOpen: false, contactName: null });
    }

    function handleContactClick(contact) {
      setDetailsModal({ isOpen: true, contact });
    }

    function handleDetailsClose() {
      setDetailsModal({ isOpen: false, contact: null });
    }

    function handleDetailsDelete(name) {
      handleDeleteClick(name);
    }

    function handleDetailsToggleFavorite(name) {
      favChange(name);
    }

    const getSortedContacts = () => {
      const contactsCopy = [...contacts];
      
      switch(sortOption) {
        case 'name-asc':
          return contactsCopy.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
          return contactsCopy.sort((a, b) => b.name.localeCompare(a.name));
        case 'favorites-first':
          return contactsCopy.sort((a, b) => {
            if (a.favourite === "Yes" && b.favourite !== "Yes") return -1;
            if (a.favourite !== "Yes" && b.favourite === "Yes") return 1;
            return a.name.localeCompare(b.name);
          });
        case 'recent':
          return contactsCopy.reverse();
        default:
          return contactsCopy.sort((a, b) => a.name.localeCompare(b.name));
      }
    };

    const sortedContacts = getSortedContacts();

    const groupContactsByLetter = () => {
      if (sortOption !== 'name-asc' && sortOption !== 'name-desc') {
        return null; 
      }

      const grouped = {};
      sortedContacts.forEach(contact => {
        const firstLetter = contact.name.charAt(0).toUpperCase();
        if (!grouped[firstLetter]) {
          grouped[firstLetter] = [];
        }
        grouped[firstLetter].push(contact);
      });
      return grouped;
    };

    const groupedContacts = groupContactsByLetter();
    
  return (
    <div className="w-full mt-3">
      {contacts.length === 0 ? (
        <EmptyState type="contacts" />
      ) : groupedContacts ? (
        Object.keys(groupedContacts).sort().map(letter => (
          <div key={letter}>
            {/* Letter Header */}
            <div className="sticky top-16 md:top-20 bg-white dark:bg-gray-900 z-10 py-1.5 border-b border-gray-300 dark:border-gray-700 mb-1 transition-colors duration-300">
              <h2 className="text-base md:text-xl font-bold text-blue-600 dark:text-blue-400 px-2">{letter}</h2>
            </div>
            {/* Contacts under this letter */}
            {groupedContacts[letter].map(item => (
              <ContactRow 
                key={item.name}
                item={item}
                selected={selected}
                onContactClick={handleContactClick}
                onSelectHandler={onSelectHandler}
                onFavChange={favChange}
                onEditClick={() => onEditContact(item)}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </div>
        ))
      ) : (
        sortedContacts.map(item => (
          <ContactRow 
            key={item.name}
            item={item}
            selected={selected}
            onContactClick={handleContactClick}
            onSelectHandler={onSelectHandler}
            onFavChange={favChange}
            onEditClick={() => onEditContact(item)}
            onDeleteClick={handleDeleteClick}
          />
        ))
      )}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        contactName={deleteModal.contactName}
        onConfirm={handleDeleteConfirm}
        onClose={handleDeleteCancel}
      />
      <ContactDetailsModal
        isOpen={detailsModal.isOpen}
        contact={detailsModal.contact}
        onClose={handleDetailsClose}
        onDelete={handleDetailsDelete}
        onToggleFavorite={handleDetailsToggleFavorite}
        onEdit={onEditContact}
      />
    </div>
  );
}

const ContactRow = ({ item, selected, onContactClick, onSelectHandler, onFavChange, onEditClick, onDeleteClick }) => {
  return (
    <div
      onClick={() => onContactClick(item)}
      className={`group flex flex-row items-center md:grid md:grid-cols-[2fr_2fr_1fr_1fr] md:items-center ${selected.includes(item.name) ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700" : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-200 dark:hover:border-gray-600"} w-full h-12 md:h-14 px-4 rounded-t-2xl rounded-b-md mb-1 transition-all duration-300 cursor-pointer active:scale-[0.99]`}
    >
      <div className="flex flex-row items-center gap-4 transition-all duration-700">
        {/* Profile Circle */}
        <div className="w-10 md:w-15 h-10 md:h-15 flex items-center justify-center">
          <div
            className={`w-8 md:w-10 h-8 md:h-10 rounded-full ${item.color} flex items-center justify-center text-white font-bold ${selected.includes(item.name)?"md:hidden":"md:group-hover:hidden "}`}
          >
            {item.name.charAt(0)}
          </div>

          {/* Checkbox */}
          <div
            className="hidden md:flex md:items-center"
            onClick={(e) => {
              e.stopPropagation();
              onSelectHandler(item.name);
            }}
          >
            {selected.includes(item.name) ? (
              <SquareCheck className="md:w-10 md:h-8 text-gray-700 font-bold hidden md:block" />
            ) : (
              <Square className="md:w-10 md:h-8 text-gray-700 font-bold hidden group-hover:block" />
            )}
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-gray-900 dark:text-gray-100 font-medium">{item.name}</h1>
        </div>
      </div>

      <div>
        <div className="hidden md:block">
          {(item.emails && item.emails.length > 0) ? (
            <div className="space-y-1">
              {item.emails.slice(0, 2).map((email, index) => (
                <h1 key={index} className="text-gray-900 dark:text-gray-100 text-sm">
                  {email}
                </h1>
              ))}
              {item.emails.length > 2 && (
                <h1 className="text-gray-500 dark:text-gray-400 text-xs">
                  +{item.emails.length - 2} more
                </h1>
              )}
            </div>
          ) : (
            <h1 className="text-gray-500 dark:text-gray-400 text-sm">No email</h1>
          )}
        </div>
      </div>
      <div>
        <div className="hidden md:block pl-3">
          {(item.phoneNumbers && item.phoneNumbers.length > 0) ? (
            <div className="space-y-1">
              {item.phoneNumbers.slice(0, 2).map((phone, index) => (
                <h1 key={index} className="text-gray-900 dark:text-gray-100 text-sm">
                  {phone}
                </h1>
              ))}
              {item.phoneNumbers.length > 2 && (
                <h1 className="text-gray-500 dark:text-gray-400 text-xs">
                  +{item.phoneNumbers.length - 2} more
                </h1>
              )}
            </div>
          ) : (
            <h1 className="text-gray-500 dark:text-gray-400 text-sm">No phone</h1>
          )}
        </div>
      </div>

      {/* Desktop: Show actions on hover */}
      <div className="hidden md:group-hover:flex md:items-center md:justify-end mr-3 gap-4">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onFavChange(item.name);
          }}
                className="hidden md:flex h-10 w-10 md:hover:bg-yellow-200 dark:md:hover:bg-yellow-800 md:hover:rounded-full items-center justify-center cursor-pointer">
                  {item.favourite === "Yes" ? (
                  <Star className="text-yellow-400 dark:text-yellow-400 fill-yellow-400 dark:fill-yellow-400" />
                  ) : (
                  <Star className="text-yellow-700 dark:text-yellow-300" />
                  )}
              </div>
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  onEditClick();
                }}
                className="hidden md:h-10 md:w-10 md:hover:bg-blue-200 dark:md:hover:bg-blue-600 md:hover:rounded-full md:flex md:items-center md:justify-center md:cursor-pointer">
                <Pencil className="text-blue-700 dark:text-blue-300 hidden md:block" />
              </div>
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteClick(item.name);
                }}
                className="hidden md:h-10 md:w-10 md:hover:bg-red-100 dark:md:hover:bg-red-900 md:hover:rounded-full md:flex md:items-center md:justify-center md:cursor-pointer">
                <Trash2 className="text-red-600 dark:text-red-400 hidden md:block w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default ShowContacts;
