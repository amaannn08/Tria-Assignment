import { createContext, useContext, useState, useEffect } from "react";
import { contacts as defaultContacts, migrateContacts } from "../../contacts"; // your contacts

const ContactsContext = createContext();

// Check if contacts need migration (old format has 'email' and 'phoneNumber' as strings)
const needsMigration = (contacts) => {
  if (!contacts || contacts.length === 0) return false;
  const firstContact = contacts[0];
  return firstContact.hasOwnProperty('email') && typeof firstContact.email === 'string';
};

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState(() => {
    const stored = localStorage.getItem("contacts");
    if (stored) {
      const parsedContacts = JSON.parse(stored);
      // Migrate if needed
      if (needsMigration(parsedContacts)) {
        console.log("Migrating contacts to new format...");
        return migrateContacts(parsedContacts);
      }
      return parsedContacts;
    }
    return defaultContacts;
  });

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <ContactsContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => useContext(ContactsContext);
