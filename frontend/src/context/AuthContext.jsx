import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')
        if (storedToken) setToken(storedToken)
        if (storedUser) setUser(JSON.parse(storedUser))
    }, [])

    const login = async (email, password) => {
        const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password })
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email, isAdmin: data.isAdmin }))
        setToken(data.token)
        setUser({ name: data.name, email: data.email, isAdmin: data.isAdmin })
        return data
    }

    const register = async (name, email, password) => {
        const { data } = await axios.post('http://localhost:5000/api/users/register', { name, email, password })
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email, isAdmin: data.isAdmin }))
        setToken(data.token)
        setUser({ name: data.name, email: data.email, isAdmin: data.isAdmin })
        return data
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
