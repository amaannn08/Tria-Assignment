import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SelectedProvider from './components/SelectedContext.jsx'
import { ContactsProvider } from './components/ContactsContext.jsx'

createRoot(document.getElementById('root')).render(
  <ContactsProvider>
    <SelectedProvider>
      <App />
    </SelectedProvider>
  </ContactsProvider>,
)
