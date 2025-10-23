import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

const SortDropdown = ({ sortOption, onSortChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const sortOptions = [
        { value: 'name-asc', label: 'Name (A-Z)' },
        { value: 'name-desc', label: 'Name (Z-A)' },
        { value: 'favorites-first', label: 'Favorites First' },
        { value: 'recent', label: 'Recently Added' },
    ];

    const currentLabel = sortOptions.find(opt => opt.value === sortOption)?.label || 'Sort';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSelect = (value) => {
        onSortChange(value);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-xs md:text-sm font-medium text-gray-700 dark:text-gray-200"
            >
                <ArrowUpDown className="w-4 h-4" />
                <span className="hidden sm:inline">{currentLabel}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-44 md:w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 animate-fadeIn">
                    {sortOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`w-full text-left px-3 md:px-4 py-2.5 md:py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm ${
                                sortOption === option.value
                                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                                    : 'text-gray-700 dark:text-gray-300'
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortDropdown;

