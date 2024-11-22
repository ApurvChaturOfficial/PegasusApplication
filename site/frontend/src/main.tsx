import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// index.jsx & index.css
import AppConnection from '@/aConnection/aAppConnection/index.tsx'
import '@/aConnection/bShadcnConnection/index.css'

// Provider
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider as ReduxProvider } from 'react-redux'

// XXXXX
import reduxConnection from './aConnection/dReduxConnection'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={reduxConnection} >
      <HelmetProvider>
        <BrowserRouter>
          <AppConnection />
        </BrowserRouter>
      </HelmetProvider>
    </ReduxProvider>
  </StrictMode>,
)
