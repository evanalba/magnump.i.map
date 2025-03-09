import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Update from './update.jsx'

createRoot(document.getElementById('update-root')).render(
    <StrictMode>
      <Update />
    </StrictMode>,
)
