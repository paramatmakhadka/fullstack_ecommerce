import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

export default function AdminCategoryForm() {
    const [name, setName] = useState('')
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/api/categories', { name }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            navigate('/admin')
        } catch (err) {
            console.error(err)
            alert(err.response?.data?.message || 'Save failed')
        }
    }

    return (
        <div style={{ maxWidth: 600, margin: '2rem auto' }}>
            <h2>Create Category</h2>
            <form onSubmit={submitHandler}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category Name</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <button type='submit' style={{ padding: '0.5rem 1rem' }}>Save Category</button>
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
