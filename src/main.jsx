import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SelectedProvider from './components/SelectedContext.jsx'

createRoot(document.getElementById('root')).render(
  <SelectedProvider>
    <App />
  </SelectedProvider>,
)
