import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import {App} from './App.tsx'
import { Toaster } from "@/components/ui/sonner"
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>

    </QueryClientProvider>
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
