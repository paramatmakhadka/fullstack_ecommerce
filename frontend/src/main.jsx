import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './styles.css'

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <App />
                </React.Suspense>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)
