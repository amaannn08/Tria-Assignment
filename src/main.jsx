import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SelectedProvider from './components/context/SelectedContext.jsx'
import { ContactsProvider } from './components/context/ContactsContext.jsx'
import { ThemeProvider } from './components/context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <ContactsProvider>
      <SelectedProvider>
        <App />
      </SelectedProvider>
    </ContactsProvider>
  </ThemeProvider>,
)
