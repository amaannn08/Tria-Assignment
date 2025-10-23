import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative w-14 h-7 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
            aria-label="Toggle theme"
        >
            {/* Sliding Circle */}
            <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${
                    isDark ? 'translate-x-7' : 'translate-x-0'
                }`}
            >
                {isDark ? (
                    <Moon className="w-4 h-4 text-blue-600" />
                ) : (
                    <Sun className="w-4 h-4 text-yellow-500" />
                )}
            </div>
        </button>
    );
};

export default ThemeToggle;

