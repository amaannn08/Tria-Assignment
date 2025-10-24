import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const DesktopThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="hidden md:flex fixed bottom-20 right-6 md:w-14 md:h-14 bg-gray-100 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:shadow-xl items-center justify-center transition-all duration-300 active:scale-95 z-50"
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

export default DesktopThemeToggle;
