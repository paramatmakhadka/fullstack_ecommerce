import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { register } = useContext(AuthContext)

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await register(name, email, password)
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Registration failed')
        }
    }

    return (
        <div style={{ maxWidth: 400, margin: '2rem auto' }}>
            <h2>Register</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={submitHandler}>
                <div>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type='submit'>Register</button>
            </form>
            <div style={{ marginTop: '1rem' }}>
                Have an account? <Link to='/login'>Login</Link>
            </div>
        </div>
    )
}
