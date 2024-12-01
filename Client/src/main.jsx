import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
  <div className='h-full w-full'>
    <BrowserRouter>
      <App />

    </BrowserRouter>
  </div>,
)
