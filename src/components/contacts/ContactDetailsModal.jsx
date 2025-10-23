import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, Star, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContacts } from '../context/ContactsContext';

const ContactDetailsModal = ({ isOpen, contact, onClose, onDelete, onToggleFavorite }) => {
    const navigate = useNavigate();
    const { contacts } = useContacts();
    const [currentContact, setCurrentContact] = useState(contact);

    // Update currentContact when contacts change or modal opens
    useEffect(() => {
        if (isOpen && contact) {
            const updated = contacts.find(c => c.name === contact.name);
            setCurrentContact(updated || contact);
        }
    }, [isOpen, contact, contacts]);

    if (!isOpen || !currentContact) return null;

    const handleEdit = () => {
        navigate(`/edit/${encodeURIComponent(currentContact.name)}`);
        onClose();
    };

    const handleDelete = () => {
        onDelete(currentContact.name);
        onClose();
    };

    const handleToggleFavorite = () => {
        onToggleFavorite(currentContact.name);
    };

    const isFavorite = currentContact.favourite === "Yes";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            ></div>
            
            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md animate-fadeIn transition-colors duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors z-10"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header with Profile Circle */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-t-lg transition-colors duration-300">
                    <div className="flex flex-col items-center">
                        <div className={`w-24 h-24 rounded-full ${currentContact.color} flex items-center justify-center shadow-lg mb-4`}>
                            <h1 className="text-5xl text-white font-bold">
                                {currentContact.name.charAt(0).toUpperCase()}
                            </h1>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
                            {currentContact.name}
                        </h2>
                        <button
                            onClick={handleToggleFavorite}
                            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                                isFavorite 
                                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50' 
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                        >
                            <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-700' : ''}`} />
                            <span className="text-sm font-medium">
                                {isFavorite ? 'Favorite' : 'Add to Favorites'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="p-6 space-y-4">
                    {/* Email */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
                            <a 
                                href={`mailto:${currentContact.email}`}
                                className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all"
                            >
                                {currentContact.email}
                            </a>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                            <a 
                                href={`tel:${currentContact.phoneNumber}`}
                                className="text-gray-900 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                            >
                                {currentContact.phoneNumber}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-6 pt-0 flex gap-3">
                    <button
                        onClick={handleEdit}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
                    >
                        <Pencil className="w-5 h-5" />
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-medium"
                    >
                        <Trash2 className="w-5 h-5" />
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactDetailsModal;

