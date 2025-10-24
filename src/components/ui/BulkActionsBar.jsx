import React, { useState } from 'react';
import { Trash2, Star, X } from 'lucide-react';
import DeleteConfirmModal from './DeleteConfirmModal';

const BulkActionsBar = ({ selectedCount, selectedContacts = [], onDelete, onFavorite, onClear }) => {
    const [deleteModal, setDeleteModal] = useState(false);

    if (selectedCount === 0) return null;

    // Determine if all selected contacts are favorites
    const allAreFavorites = selectedContacts.length > 0 && selectedContacts.every(contact => contact.favourite === "Yes");
    const favoriteButtonText = allAreFavorites ? "Remove from Favorites" : "Add to Favorites";

    const handleDeleteClick = () => {
        setDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        onDelete();
        setDeleteModal(false);
    };

    const handleDeleteCancel = () => {
        setDeleteModal(false);
    };

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 bg-blue-600 dark:bg-blue-700 text-white shadow-lg z-40 animate-slideUp transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Left: Selection count */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onClear}
                                className="p-2 hover:bg-blue-700 dark:hover:bg-blue-800 rounded-full transition-colors"
                                title="Clear selection"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <span className="font-medium text-lg">
                                {selectedCount} {selectedCount === 1 ? 'contact' : 'contacts'} selected
                            </span>
                        </div>

                        {/* Right: Action buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onFavorite}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-700 dark:bg-blue-800 hover:bg-blue-800 dark:hover:bg-blue-900 rounded-md transition-colors"
                                title={favoriteButtonText}
                            >
                                <Star className={`w-5 h-5 ${allAreFavorites ? 'text-yellow-400 fill-yellow-400' : 'text-white'}`} />
                                <span className="hidden md:inline">{allAreFavorites ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                            </button>
                            <button
                                onClick={handleDeleteClick}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 rounded-md transition-colors"
                                title="Delete selected"
                            >
                                <Trash2 className="w-5 h-5" />
                                <span className="hidden md:inline">Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <DeleteConfirmModal
                isOpen={deleteModal}
                count={selectedCount}
                onConfirm={handleDeleteConfirm}
                onClose={handleDeleteCancel}
            />
        </>
    );
};

export default BulkActionsBar;

