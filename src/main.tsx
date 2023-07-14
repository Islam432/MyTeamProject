import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Layout from './modules/authentication/components/Layout/index.tsx'




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
 <React.StrictMode>
  <Layout>
    <App />

  </Layout>
  </React.StrictMode>
  </BrowserRouter>
)

