import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Remove from './remove.jsx'

createRoot(document.getElementById('remove-root')).render(
    <StrictMode>
      <Remove />
    </StrictMode>,
)
