import React, { useState } from 'react';
import { X, User, Mail, Phone, Check, AlertTriangle, Users } from 'lucide-react';
import { useContacts } from '../context/ContactsContext';
import { mergeContacts } from '../../contacts';

const MergeContactsModal = ({ isOpen, onClose, duplicateContacts, newContact, onMergeComplete }) => {
  const { contacts, setContacts } = useContacts();
  const [selectedPrimary, setSelectedPrimary] = useState(0);
  const [selectedEmails, setSelectedEmails] = useState({});
  const [selectedPhoneNumbers, setSelectedPhoneNumbers] = useState({});

  const allContacts = [...duplicateContacts, newContact];
  
  // Initialize selected items
  React.useEffect(() => {
    if (!isOpen || !duplicateContacts || duplicateContacts.length === 0) return;
    
    const emailSelections = {};
    const phoneSelections = {};
    
    allContacts.forEach((contact, index) => {
      contact.emails?.forEach((email, emailIndex) => {
        emailSelections[`${index}-${emailIndex}`] = true;
      });
      contact.phoneNumbers?.forEach((phone, phoneIndex) => {
        phoneSelections[`${index}-${phoneIndex}`] = true;
      });
    });
    
    setSelectedEmails(emailSelections);
    setSelectedPhoneNumbers(phoneSelections);
  }, [isOpen, duplicateContacts, allContacts]);

  if (!isOpen || !duplicateContacts || duplicateContacts.length === 0) return null;

  const handleMerge = () => {
    const primaryContact = allContacts[selectedPrimary];
    
    // Collect selected emails and phone numbers
    const mergedEmails = [];
    const mergedPhoneNumbers = [];
    
    allContacts.forEach((contact, contactIndex) => {
      contact.emails?.forEach((email, emailIndex) => {
        const key = `${contactIndex}-${emailIndex}`;
        if (selectedEmails[key] && !mergedEmails.includes(email)) {
          mergedEmails.push(email);
        }
      });
      
      contact.phoneNumbers?.forEach((phone, phoneIndex) => {
        const key = `${contactIndex}-${phoneIndex}`;
        if (selectedPhoneNumbers[key] && !mergedPhoneNumbers.includes(phone)) {
          mergedPhoneNumbers.push(phone);
        }
      });
    });

    // Create merged contact
    const mergedContact = {
      ...primaryContact,
      emails: mergedEmails,
      phoneNumbers: mergedPhoneNumbers
    };

    // Remove all duplicate contacts and add the merged one
    const updatedContacts = contacts.filter(contact => 
      !allContacts.some(dup => dup.name === contact.name)
    );
    
    setContacts([...updatedContacts, mergedContact]);
    onClose();
    if (onMergeComplete) {
      onMergeComplete();
    }
  };

  const toggleEmailSelection = (contactIndex, emailIndex) => {
    const key = `${contactIndex}-${emailIndex}`;
    setSelectedEmails(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const togglePhoneSelection = (contactIndex, phoneIndex) => {
    const key = `${contactIndex}-${phoneIndex}`;
    setSelectedPhoneNumbers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fadeIn transition-colors duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Merge Duplicate Contacts</h2>
              <p className="text-gray-600 dark:text-gray-400">We found contacts with the same name. Choose which information to keep.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Primary Contact Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Choose Primary Contact
            </h3>
            <div className="grid gap-3">
              {allContacts.map((contact, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPrimary(index)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPrimary === index
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${contact.color} flex items-center justify-center text-white font-bold`}>
                      {contact.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">{contact.name}</h4>
                      
                      {/* Emails */}
                      <div className="mb-2">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Emails:</div>
                        <div className="space-y-1">
                          {(contact.emails && contact.emails.length > 0) ? (
                            contact.emails.slice(0, 2).map((email, emailIndex) => (
                              <div key={emailIndex} className="text-sm text-gray-700 dark:text-gray-300 truncate">
                                {email}
                              </div>
                            ))
                          ) : (
                            <div className="text-sm text-gray-500 dark:text-gray-400">No emails</div>
                          )}
                          {contact.emails && contact.emails.length > 2 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              +{contact.emails.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Phone Numbers */}
                      <div>
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Phone Numbers:</div>
                        <div className="space-y-1">
                          {(contact.phoneNumbers && contact.phoneNumbers.length > 0) ? (
                            contact.phoneNumbers.slice(0, 2).map((phone, phoneIndex) => (
                              <div key={phoneIndex} className="text-sm text-gray-700 dark:text-gray-300">
                                {phone}
                              </div>
                            ))
                          ) : (
                            <div className="text-sm text-gray-500 dark:text-gray-400">No phone numbers</div>
                          )}
                          {contact.phoneNumbers && contact.phoneNumbers.length > 2 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              +{contact.phoneNumbers.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {selectedPrimary === index && (
                      <Check className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Select Emails to Keep
            </h3>
            <div className="space-y-2">
              {allContacts.map((contact, contactIndex) => (
                <div key={contactIndex} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    From: {contact.name}
                  </div>
                  <div className="space-y-2">
                    {contact.emails?.map((email, emailIndex) => {
                      const key = `${contactIndex}-${emailIndex}`;
                      const isSelected = selectedEmails[key];
                      return (
                        <label
                          key={emailIndex}
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleEmailSelection(contactIndex, emailIndex)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <span className="text-gray-900 dark:text-gray-100">{email}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone Number Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Select Phone Numbers to Keep
            </h3>
            <div className="space-y-2">
              {allContacts.map((contact, contactIndex) => (
                <div key={contactIndex} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    From: {contact.name}
                  </div>
                  <div className="space-y-2">
                    {contact.phoneNumbers?.map((phone, phoneIndex) => {
                      const key = `${contactIndex}-${phoneIndex}`;
                      const isSelected = selectedPhoneNumbers[key];
                      return (
                        <label
                          key={phoneIndex}
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => togglePhoneSelection(contactIndex, phoneIndex)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <span className="text-gray-900 dark:text-gray-100">{phone}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleMerge}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-md transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Merge Contacts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MergeContactsModal;
