import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'

export default function Header() {
    const { user, logout } = useContext(AuthContext)
    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <header style={{ padding: '1rem', background: '#222', color: '#fff' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
                <div><Link to='/' style={{ color: '#fff', textDecoration: 'none' }}>MERN Ecommerce</Link></div>
                <div>
                    <Link to='/cart' style={{ color: '#fff', marginRight: '1rem' }}>Cart ({cartItems.reduce((s, i) => s + i.qty, 0)})</Link>
                    {user ? (
                        <>
                            <span style={{ marginRight: '1rem' }}>Hello, {user.name}</span>
                            <Link to='/profile' style={{ color: '#fff', marginRight: '1rem' }}>Profile</Link>
                            {user.isAdmin && <Link to='/admin' style={{ color: '#fff', marginRight: '1rem' }}>Admin</Link>}
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to='/login' style={{ color: '#fff', marginRight: '1rem' }}>Login</Link>
                            <Link to='/register' style={{ color: '#fff' }}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
