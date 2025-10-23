import React from 'react';
import { Trash2, X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, contactName, count = 1 }) => {
    if (!isOpen) return null;

    const isMultiple = count > 1;
    const title = isMultiple ? `Delete ${count} Contacts?` : 'Delete Contact?';
    const message = isMultiple
        ? `Are you sure you want to delete ${count} selected contacts? This action cannot be undone.`
        : `Are you sure you want to delete "${contactName}"? This action cannot be undone.`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            ></div>
            
            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 m-4 max-w-md w-full animate-fadeIn transition-colors duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
                    {title}
                </h2>

                {/* Message */}
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                    {message}
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-md transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white rounded-md transition-colors font-medium"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;

