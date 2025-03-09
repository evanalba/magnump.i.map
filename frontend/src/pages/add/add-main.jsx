import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Add from './add.jsx'

createRoot(document.getElementById('add-root')).render(
    <StrictMode>
      <Add />
    </StrictMode>,
)
