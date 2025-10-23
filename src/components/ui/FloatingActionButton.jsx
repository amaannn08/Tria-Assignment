import React from 'react';
import { Plus } from 'lucide-react';
import MobileThemeToggle from './MobileThemeToggle';

const FloatingActionButton = ({ onCreateContact }) => {

    return (
        <div className="md:hidden fixed bottom-6 right-6 flex flex-col gap-3 z-40">
            <button
                onClick={onCreateContact}
                className="w-14 h-14 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 active:scale-95"
                aria-label="Create new contact"
            >
                <Plus className="w-7 h-7" strokeWidth={2.5} />
            </button>
            <MobileThemeToggle />
        </div>
    );
};

export default FloatingActionButton;

