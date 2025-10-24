// Migration function to convert old contact format to new format
export const migrateContacts = (oldContacts) => {
  return oldContacts.map(contact => ({
    ...contact,
    emails: contact.email ? [contact.email] : [],
    phoneNumbers: contact.phoneNumber ? [contact.phoneNumber] : [],
    // Keep old fields for backward compatibility during transition
    email: contact.email,
    phoneNumber: contact.phoneNumber
  }));
};

// Sample contacts with new data structure
export const contacts = [
  {
    "name": "Aman Gupta", 
    "emails": ["aman.gupta@email.com", "aman.gupta.work@company.com"], 
    "phoneNumbers": ["9876543210", "9876543211"], 
    "favourite": "Yes", 
    "color": "bg-yellow-700"
  },
  {
    "name": "Riya Sharma", 
    "emails": ["riya.sharma@email.com"], 
    "phoneNumbers": ["9876541230"], 
    "favourite": "No", 
    "color": "bg-blue-700"
  },
  {
    "name": "Karan Verma", 
    "emails": ["karan.verma@email.com", "karan.verma.personal@gmail.com"], 
    "phoneNumbers": ["9876512345", "9876512346"], 
    "favourite": "No", 
    "color": "bg-green-700"
  },
  {
    "name": "Priya Singh", 
    "emails": ["priya.singh@email.com"], 
    "phoneNumbers": ["9876523456"], 
    "favourite": "Yes", 
    "color": "bg-red-700"
  },
  {
    "name": "Vikram Rao", 
    "emails": ["vikram.rao@email.com"], 
    "phoneNumbers": ["9876534567"], 
    "favourite": "No", 
    "color": "bg-yellow-700"
  },
  {
    "name": "Ananya Mehta", 
    "emails": ["ananya.mehta@email.com"], 
    "phoneNumbers": ["9876545678"], 
    "favourite": "No", 
    "color": "bg-blue-700"
  },
  {
    "name": "Rohit Kapoor", 
    "emails": ["rohit.kapoor@email.com", "rohit.kapoor.office@work.com"], 
    "phoneNumbers": ["9876556789", "9876556790"], 
    "favourite": "Yes", 
    "color": "bg-green-700"
  },
  {
    "name": "Sakshi Jain", 
    "emails": ["sakshi.jain@email.com"], 
    "phoneNumbers": ["9876567890"], 
    "favourite": "No", 
    "color": "bg-red-700"
  },
  {
    "name": "Devansh Chawla", 
    "emails": ["devansh.chawla@email.com"], 
    "phoneNumbers": ["9876578901"], 
    "favourite": "Yes", 
    "color": "bg-yellow-700"
  },
  {
    "name": "Isha Kapoor", 
    "emails": ["isha.kapoor@email.com"], 
    "phoneNumbers": ["9876589012"], 
    "favourite": "No", 
    "color": "bg-blue-700"
  }
];


// New contact format with multiple emails and phone numbers
// {
//     "name": "Brianna Britt",
//     "emails": ["briannabritt@poochies.com", "brianna.work@company.com"],
//     "phoneNumbers": ["(820) 525-2256", "(820) 525-2257"],
//     "favourite": "No",
//     "color": "bg-blue-700"
// }

// Helper functions for contact operations
export const findDuplicateContacts = (contacts, newContact) => {
  return contacts.filter(contact => 
    contact.name.toLowerCase() === newContact.name.toLowerCase()
  );
};

export const mergeContacts = (primaryContact, secondaryContact) => {
  const mergedEmails = [...new Set([...primaryContact.emails, ...secondaryContact.emails])];
  const mergedPhoneNumbers = [...new Set([...primaryContact.phoneNumbers, ...secondaryContact.phoneNumbers])];
  
  return {
    ...primaryContact,
    emails: mergedEmails,
    phoneNumbers: mergedPhoneNumbers,
    // Keep the primary contact's favorite status and color
    favourite: primaryContact.favourite,
    color: primaryContact.color
  };
};