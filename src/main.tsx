import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import {App} from './App.tsx'
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster 
    toastOptions={{
      style: {
        background: 'black',
        color: 'white'
      },
    }}
    position='top-center' />
  </StrictMode>,
)
