import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/users/profile')
                setUser(data)
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    const login = async (email, password) => {
        const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password })
        setUser(data)
        return data
    }

    const register = async (name, email, password) => {
        const { data } = await axios.post('http://localhost:5000/api/users/register', { name, email, password })
        setUser(data)
        return data
    }

    const logout = async () => {
        try {
            await axios.post('http://localhost:5000/api/users/logout')
            setUser(null)
        } catch (error) {
            console.error('Logout failed', error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
