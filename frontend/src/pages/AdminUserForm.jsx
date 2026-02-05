import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

export default function AdminUserForm() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        isAdmin: false
    })
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/api/admin/users', form, {
                headers: { Authorization: `Bearer ${token}` }
            })
            navigate('/admin')
        } catch (err) {
            console.error(err)
            alert(err.response?.data?.message || 'User creation failed')
        }
    }

    return (
        <div style={{ maxWidth: 600, margin: '2rem auto' }}>
            <h2>Create New User</h2>
            <form onSubmit={submitHandler}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                    <input
                        name='name'
                        type='text'
                        value={form.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                    <input
                        name='email'
                        type='email'
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                    <input
                        name='password'
                        type='password'
                        value={form.password}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        <input
                            name='isAdmin'
                            type='checkbox'
                            checked={form.isAdmin}
                            onChange={handleChange}
                        />
                        Admin User
                    </label>
                </div>
                <button type='submit' style={{ padding: '0.5rem 1rem' }}>Create User</button>
                <button
                    type='button'
                    onClick={() => navigate('/admin')}
                    style={{ marginLeft: 8, padding: '0.5rem 1rem' }}
                >
                    Cancel
                </button>
            </form>
        </div>
    )
}
