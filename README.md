# Contact Management Application

A modern, responsive contact management application built with React and Vite. This application provides a comprehensive solution for managing personal contacts with features like search, favorites, bulk operations, and theme switching.

## [Deployed on Vercell](https://tria-assignment-delta.vercel.app/)

## 🆕 Recent Updates

### Version 2.0 - Enhanced Contact Management
- **Multiple Contact Details**: Added support for multiple email addresses and phone numbers per contact
- **Duplicate Detection & Merging**: Automatic detection of duplicate contacts with intelligent merging options
- **Enhanced Mobile Experience**: Improved mobile selection with long-press functionality and clean hover-free interface
- **Smart Bulk Operations**: Intelligent favorite toggling based on current selection state
- **Improved UI/UX**: Better visual feedback, responsive modals, and enhanced form handling
- **Data Migration**: Automatic migration of existing contacts to support new multiple detail structure

## 🚀 Tech Stack

- **React 19** - Modern React with hooks and context API
- **Vite 7** - Fast build tool and development server
- **Tailwind CSS 3** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **React Router DOM 7** - Client-side routing
- **LocalStorage API** - Data persistence

## ✨ Features

### 📱 Contact Management
- **Create Contacts**: Add new contacts with first name, last name, multiple emails, and multiple phone numbers
- **Edit Contacts**: Modify existing contact information through intuitive modal popups with support for multiple emails/phones
- **Delete Contacts**: Remove contacts with confirmation modal for safety
- **View Details**: Click any contact to view detailed information in a modal
- **Profile Colors**: Automatic random color assignment for visual contact identification
- **Form Validation**: Real-time validation with helpful error messages
- **Multiple Contact Details**: Support for multiple email addresses and phone numbers per contact
- **Duplicate Detection**: Automatic detection of duplicate contacts by name or phone number
- **Contact Merging**: Merge duplicate contacts with option to choose primary contact and combine details

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
- **Mobile Long-press**: Long-press on mobile to select contacts
- **Desktop Hover Selection**: Hover to show checkbox, click to select on desktop
- **Bulk Delete**: Delete multiple contacts simultaneously
- **Bulk Favorites**: Toggle favorite status for selected contacts (smart toggle based on selection state)
- **Select All/Deselect All**: Quick selection controls available on mobile and desktop
- **Floating Action Bar**: Shows selected count and available actions
- **Dynamic Positioning**: Floating buttons adjust position when bulk actions bar is visible

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
- **Consistent Color Scheme**: Unified dark theme with proper contrast and readability

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
- **Mobile Selection**: Long-press to select contacts on mobile devices
- **Desktop Hover**: Hover interactions for desktop users
- **No Mobile Hover**: Clean mobile experience without unwanted hover effects

### 🎯 UI/UX Features
- **Modal Workflows**: Create and edit contacts through elegant modal popups
- **Alphabetical Grouping**: Contacts organized by first letter for easy navigation
- **Empty States**: Helpful messages when no contacts exist
- **Confirmation Modals**: Safety confirmations for destructive actions
- **Form Validation**: Real-time validation with clear error messages
- **Smooth Animations**: Polished transitions and micro-interactions
- **Live Preview**: Real-time preview of contact details while creating/editing
- **Smart Form Handling**: Dynamic add/remove fields for multiple emails and phone numbers
- **Intuitive Selection**: Clear visual feedback for selected contacts
- **Responsive Modals**: Full-screen modals on mobile, centered on desktop

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
│   │   ├── MergeContactsModal.jsx
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
3. Optionally add multiple email addresses using the "+ Add Email" button
4. Optionally add multiple phone numbers using the "+ Add Phone" button
5. Toggle favorite status if desired
6. If duplicate contacts are detected, choose to merge or create separately
7. Click "Save" to create the contact

### Searching Contacts
- **Desktop**: Use the search bar in the header
- **Mobile**: Tap the search icon to expand the search interface
- Type any part of the contact's name, email, or phone number

### Managing Favorites
- Click the star icon next to any contact to toggle favorite status
- View all favorites in the dedicated favorites section
- Use bulk operations to manage multiple favorites at once

### Bulk Operations
1. **Desktop**: Hover over contacts to show checkboxes, then click to select
2. **Mobile**: Long-press on contacts to select them
3. Use "Select All" button to select all contacts at once
4. Use the floating action bar to perform bulk actions
5. Choose to delete or toggle favorite status for selected contacts
6. The favorite button intelligently adds all to favorites or removes all from favorites based on current selection

## 🔮 Future Enhancements

- **Import/Export**: CSV import/export functionality
- **Contact Categories**: Organize contacts by categories or tags
- **Photo Upload**: Add profile pictures for contacts
- **Backup & Sync**: Cloud backup and synchronization
- **Advanced Search**: Filter by multiple criteria
- **Contact Groups**: Create and manage contact groups
- **Notes & Reminders**: Add notes and set reminders for contacts
- **Contact Sharing**: Share contacts via QR codes or links
- **Advanced Merge Options**: More sophisticated duplicate detection algorithms

## 📄 License

This project is part of a technical assignment and is for demonstration purposes.

---

**Built with ❤️ using React and modern web technologies**