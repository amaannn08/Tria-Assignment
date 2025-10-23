import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const MobileThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="w-14 h-14 bg-gray-100 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 active:scale-95"
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Moon className="w-6 h-6 text-blue-600" />
            ) : (
                <Sun className="w-6 h-6 text-yellow-500" />
            )}
        </button>
    );
};

export default MobileThemeToggle;
