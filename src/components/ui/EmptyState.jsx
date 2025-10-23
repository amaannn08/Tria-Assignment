import React from 'react';
import { UserPlus, Star, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyState = ({ type = 'contacts' }) => {
    const navigate = useNavigate();

    const configs = {
        contacts: {
            icon: UserPlus,
            title: 'No Contacts Yet',
            message: 'Get started by creating your first contact.',
            actionText: 'Create Contact',
            action: () => navigate('/create'),
        },
        favorites: {
            icon: Star,
            title: 'No Favorites',
            message: 'Star your favorite contacts to see them here.',
            actionText: null,
            action: null,
        },
        search: {
            icon: Search,
            title: 'No Results Found',
            message: 'Try adjusting your search terms.',
            actionText: null,
            action: null,
        },
    };

    const config = configs[type] || configs.contacts;
    const Icon = config.icon;

    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 transition-colors duration-300">
                <Icon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {config.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-sm">
                {config.message}
            </p>
            {config.actionText && config.action && (
                <button
                    onClick={config.action}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-md transition-colors font-medium shadow-md hover:shadow-lg"
                >
                    {config.actionText}
                </button>
            )}
        </div>
    );
};

export default EmptyState;

