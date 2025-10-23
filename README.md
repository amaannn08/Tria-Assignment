# Contact Management Application

A modern, responsive contact management application built with React and Vite. This application provides a comprehensive solution for managing personal contacts with features like search, favorites, bulk operations, and theme switching.

## [Deployed on Vercell](https://tria-assignment-delta.vercel.app/)

## 🚀 Tech Stack

- **React 19** - Modern React with hooks and context API
- **Vite 7** - Fast build tool and development server
- **Tailwind CSS 3** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **React Router DOM 7** - Client-side routing
- **LocalStorage API** - Data persistence

## ✨ Features

### 📱 Contact Management
- **Create Contacts**: Add new contacts with first name, last name, email (optional), and 10-digit phone number
- **Edit Contacts**: Modify existing contact information through intuitive modal popups
- **Delete Contacts**: Remove contacts with confirmation modal for safety
- **View Details**: Click any contact to view detailed information in a modal
- **Profile Colors**: Automatic random color assignment for visual contact identification
- **Form Validation**: Real-time validation with helpful error messages

### 🔍 Search Functionality
- **Desktop Search**: Full search bar in the header for quick access
- **Mobile Search**: Expandable search icon that opens to full-screen search interface
- **Real-time Search**: Instant search results as you type
- **Multi-field Search**: Search by name, email, or phone number
- **Interactive Results**: Click search results to view contact details

### ⭐ Favorites System
- **Mark Favorites**: Toggle favorite status for any contact
- **Favorites View**: Dedicated section to view all favorite contacts
- **Bulk Favorites**: Toggle favorite status for multiple contacts at once
- **Visual Indicators**: Clear visual distinction for favorite contacts

### 📋 Bulk Operations
- **Multi-select**: Select multiple contacts using checkboxes
- **Bulk Delete**: Delete multiple contacts simultaneously
- **Bulk Favorites**: Toggle favorite status for selected contacts
- **Select All/Deselect All**: Quick selection controls
- **Floating Action Bar**: Shows selected count and available actions

### 🔄 Sorting Options
- **Name Sorting**: Sort contacts alphabetically (A-Z or Z-A)
- **Recent Sorting**: Sort by recently added contacts
- **Dropdown Selector**: Easy-to-use sorting interface

### 🎨 Theme System
- **Light/Dark Mode**: Toggle between light and dark themes
- **Desktop Theme Toggle**: Floating theme toggle button (bottom-right)
- **Mobile Theme Toggle**: Theme toggle positioned below floating action button
- **Smooth Transitions**: Elegant theme switching animations
- **Persistent Preferences**: Theme choice saved across sessions

### 💾 Data Persistence
- **LocalStorage Integration**: All contacts automatically saved to browser storage
- **Auto-save**: Changes saved immediately without manual intervention
- **Data Recovery**: Contacts persist across page refreshes and browser sessions

### 📱 Responsive Design
- **Mobile-first Approach**: Optimized for mobile devices
- **Adaptive Layouts**: Different layouts for mobile, tablet, and desktop
- **Touch-friendly UI**: Large touch targets and intuitive mobile interactions
- **Floating Action Button**: Easy contact creation on mobile
- **Adaptive Search**: Different search interfaces for different screen sizes

### 🎯 UI/UX Features
- **Modal Workflows**: Create and edit contacts through elegant modal popups
- **Alphabetical Grouping**: Contacts organized by first letter for easy navigation
- **Empty States**: Helpful messages when no contacts exist
- **Confirmation Modals**: Safety confirmations for destructive actions
- **Form Validation**: Real-time validation with clear error messages
- **Smooth Animations**: Polished transitions and micro-interactions

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Tria-Assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── contacts/          # Contact-related components
│   │   ├── ContactDetailsModal.jsx
│   │   ├── CreateContact.jsx
│   │   ├── CreateContactModal.jsx
│   │   ├── EditContact.jsx
│   │   ├── EditContactModal.jsx
│   │   └── ShowContacts.jsx
│   ├── context/           # React Context providers
│   │   ├── ContactsContext.jsx
│   │   ├── CreateContactContext.jsx
│   │   ├── SelectedContext.jsx
│   │   └── ThemeContext.jsx
│   ├── favourites/        # Favorites functionality
│   │   ├── Favourite.jsx
│   │   └── FavouriteList.jsx
│   ├── layout/            # Layout components
│   │   ├── Header.jsx
│   │   └── Maincontent.jsx
│   ├── search/            # Search functionality
│   │   ├── MobileSearchBox.jsx
│   │   ├── SearchBar.jsx
│   │   └── SearchedContacts.jsx
│   └── ui/                # Reusable UI components
│       ├── BulkActionsBar.jsx
│       ├── CreateContactButton.jsx
│       ├── DeleteConfirmModal.jsx
│       ├── DesktopThemeToggle.jsx
│       ├── EmptyState.jsx
│       ├── FloatingActionButton.jsx
│       ├── MobileThemeToggle.jsx
│       ├── SortDropdown.jsx
│       └── ThemeToggle.jsx
├── contacts.js            # Sample contact data
├── App.jsx               # Main application component
├── main.jsx              # Application entry point
└── index.css             # Global styles
```

## 🌐 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **ES6+ Support**: Requires modern JavaScript features
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **LocalStorage**: Requires browser support for data persistence

## 🚀 Usage

### Creating a Contact
1. Click the "+" button (mobile) or "Add Contact" button (desktop)
2. Fill in the required fields (first name, last name, phone number)
3. Optionally add an email address
4. Toggle favorite status if desired
5. Click "Save" to create the contact

### Searching Contacts
- **Desktop**: Use the search bar in the header
- **Mobile**: Tap the search icon to expand the search interface
- Type any part of the contact's name, email, or phone number

### Managing Favorites
- Click the star icon next to any contact to toggle favorite status
- View all favorites in the dedicated favorites section
- Use bulk operations to manage multiple favorites at once

### Bulk Operations
1. Select contacts using the checkboxes
2. Use the floating action bar to perform bulk actions
3. Choose to delete or toggle favorite status for selected contacts

## 🔮 Future Enhancements

- **Import/Export**: CSV import/export functionality
- **Contact Categories**: Organize contacts by categories or tags
- **Photo Upload**: Add profile pictures for contacts
- **Duplicate Detection**: Automatic detection and merging of duplicate contacts
- **Backup & Sync**: Cloud backup and synchronization
- **Advanced Search**: Filter by multiple criteria
- **Contact Groups**: Create and manage contact groups
- **Notes & Reminders**: Add notes and set reminders for contacts

## 📄 License

This project is part of a technical assignment and is for demonstration purposes.

---

**Built with ❤️ using React and modern web technologies**