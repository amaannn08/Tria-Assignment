import React, { createContext, useContext, useState } from 'react';

const CreateContactContext = createContext();

export const useCreateContact = () => {
  const context = useContext(CreateContactContext);
  if (!context) {
    throw new Error('useCreateContact must be used within a CreateContactProvider');
  }
  return context;
};

export const CreateContactProvider = ({ children }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const openEditModal = (contact) => {
    console.log('Opening edit modal for contact:', contact);
    setContactToEdit(contact);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setContactToEdit(null);
  };

  return (
    <CreateContactContext.Provider value={{
      createModalOpen,
      editModalOpen,
      contactToEdit,
      openCreateModal,
      closeCreateModal,
      openEditModal,
      closeEditModal
    }}>
      {children}
    </CreateContactContext.Provider>
  );
};
