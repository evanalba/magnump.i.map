import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Add from './add.jsx'

// createRoot(document.getElementById('add-root')).render(
//     <StrictMode>
//       <Add />
//     </StrictMode>,
// )

// if (rootElement) {
//   createRoot(rootElement).render(<App />);
// } else {
//   console.log("Root element not found");
// }

const rootElement = document.getElementById('add-root'); // Define rootElement

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Add />
    </StrictMode>
  );
} else {
  console.log('Root element not found');
}