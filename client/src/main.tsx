import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import designToken from '../designTokens'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={designToken}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
