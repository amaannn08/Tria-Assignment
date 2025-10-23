import React, { useState } from 'react'
import Favourite from '../favourites/Favourite'
import { useContacts } from "../context/ContactsContext";
import { useSelected } from "../context/SelectedContext";
import ShowContacts from '../contacts/ShowContacts'
import BulkActionsBar from '../ui/BulkActionsBar'
import SortDropdown from '../ui/SortDropdown'
import FloatingActionButton from '../ui/FloatingActionButton'

const Maincontent = () => {
  const { contacts, setContacts } = useContacts();
  const { selected, setSelected } = useSelected();
  const [sortOption, setSortOption] = useState('name-asc');

  const handleBulkDelete = () => {
    const updatedContacts = contacts.filter(c => !selected.includes(c.name));
    setContacts(updatedContacts);
    setSelected([]);
  };

  const handleBulkFavorite = () => {
    const updatedContacts = contacts.map(c => {
      if (selected.includes(c.name)) {
        return { ...c, favourite: c.favourite === "Yes" ? "No" : "Yes" };
      }
      return c;
    });
    setContacts(updatedContacts);
  };

  const handleClearSelection = () => {
    setSelected([]);
  };

  const handleSelectAll = () => {
    setSelected(contacts.map(c => c.name));
  };

  const handleDeselectAll = () => {
    setSelected([]);
  };

  return (
    <div>
        <div>
            <Element 
              contacts={contacts} 
              selected={selected}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
              sortOption={sortOption}
              onSortChange={setSortOption}
            />
            <Favourite/>
            <ShowContacts sortOption={sortOption}/>
        </div>
        <BulkActionsBar 
          selectedCount={selected.length}
          onDelete={handleBulkDelete}
          onFavorite={handleBulkFavorite}
          onClear={handleClearSelection}
        />
        <FloatingActionButton />
    </div>
  )
}
function Element ({ contacts, selected, onSelectAll, onDeselectAll, sortOption, onSortChange }){
  const allSelected = contacts.length > 0 && selected.length === contacts.length;
  
  return (
    <>
      {/* Mobile Header */}
      <div className='mt-2 flex md:hidden flex-row items-center justify-between gap-2 px-2'>
        <div className='flex items-center gap-2'>
          <h1 className='text-gray-800 dark:text-gray-100 font-sans text-xl font-semibold'>Contacts</h1>
          <h1 className='text-gray-600 dark:text-gray-400 font-sans text-sm'>({contacts.length})</h1>
        </div>
        {contacts.length > 0 && (
          <SortDropdown sortOption={sortOption} onSortChange={onSortChange} />
        )}
      </div>

      {/* Desktop Header */}
      <div className='mt-6 hidden md:flex flex-row items-center gap-4'>
        <h1 className='text-gray-800 dark:text-gray-100 font-sans text-3xl font-semibold'>Contacts </h1>
        <h1 className='text-gray-700 dark:text-gray-400 font-sans text-xl font-semibold'>({contacts.length})</h1>
        <div className='flex items-center gap-3 ml-auto'>
          {contacts.length > 0 && (
            <>
              <SortDropdown sortOption={sortOption} onSortChange={onSortChange} />
              <button
                onClick={allSelected ? onDeselectAll : onSelectAll}
                className='text-blue-600 hover:text-blue-700 font-medium text-sm underline'
              >
                {allSelected ? 'Deselect All' : 'Select All'}
              </button>
            </>
          )}
        </div>
      </div>
      <div className='mt-2 md:grid md:grid-cols-[2fr_2fr_1fr_1fr] hidden'>
        <h1 className='text-gray-700 dark:text-gray-300 font-sans text-xl font-semibold'>Name</h1>
        <h1 className='text-gray-700 dark:text-gray-300 font-sans text-xl font-semibold'>Email</h1>
        <h1 className='text-gray-700 dark:text-gray-300 font-sans text-xl font-semibold'>Phone Number</h1>
      </div>
      <hr className='hidden md:block my-2 border-t border-gray-400 dark:border-gray-600'/>
    </>
  )
}
export default Maincontent