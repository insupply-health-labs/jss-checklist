import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.tsx'

const basePath = import.meta.env.VITE_BASE_FRONTEND_PATH as string;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter basename={basePath}>
          <App />
      </BrowserRouter>
  </StrictMode>,
)
