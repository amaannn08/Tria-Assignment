import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingActionButton = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/create')}
            className="md:hidden fixed bottom-20 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 active:scale-95 z-40"
            aria-label="Create new contact"
        >
            <Plus className="w-7 h-7" strokeWidth={2.5} />
        </button>
    );
};

export default FloatingActionButton;

