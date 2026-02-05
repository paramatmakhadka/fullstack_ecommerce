import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function AdminHeader() {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <header style={{ padding: '1rem', background: '#333', color: '#fff' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 'bold' }}>
                    <Link to='/admin' style={{ color: '#fff', textDecoration: 'none', marginRight: '2rem' }}>ADMIN PANEL</Link>
                </div>
                <nav>
                    <Link to='/' style={{ color: '#aaa', textDecoration: 'none', marginRight: '1.5rem', fontSize: '14px' }}>View Store</Link>
                    <Link to='/admin' style={{ color: '#fff', marginRight: '1rem', textDecoration: 'none', fontWeight: 'bold' }}>Dashboard</Link>
                    <Link to='/admin?tab=products' style={{ color: '#fff', marginRight: '1rem', textDecoration: 'none' }}>Products</Link>
                    <Link to='/admin?tab=categories' style={{ color: '#fff', marginRight: '1rem', textDecoration: 'none' }}>Categories</Link>
                    <Link to='/admin?tab=users' style={{ color: '#fff', marginRight: '1rem', textDecoration: 'none' }}>Users</Link>
                    <Link to='/admin?tab=orders' style={{ color: '#fff', marginRight: '1.5rem', textDecoration: 'none' }}>Orders</Link>
                    <button onClick={handleLogout} style={{ background: '#e74c3c', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', cursor: 'pointer', borderRadius: '4px' }}>Logout</button>
                </nav>
            </div>
        </header>
    )
}
