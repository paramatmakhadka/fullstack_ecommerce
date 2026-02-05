import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'

export default function AdminCategoryForm() {
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()
    const isEdit = !!id

    useEffect(() => {
        if (isEdit) {
            const fetchCategory = async () => {
                try {
                    const { data } = await axios.get(`http://localhost:5000/api/categories/${id}`)
                    setName(data.name)
                } catch (err) {
                    console.error(err)
                }
            }
            fetchCategory()
        }
    }, [id, isEdit])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            if (isEdit) {
                await axios.put(`http://localhost:5000/api/categories/${id}`, { name })
            } else {
                await axios.post('http://localhost:5000/api/categories', { name })
            }
            navigate('/admin?tab=categories')
        } catch (err) {
            console.error(err)
            alert(err.response?.data?.message || 'Save failed')
        }
    }

    return (
        <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
            <h2>{isEdit ? 'Edit Category' : 'Create Category'}</h2>
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
                <button type='submit' style={{ padding: '0.5rem 1rem' }}>{isEdit ? 'Update' : 'Save'} Category</button>
                <button
                    type='button'
                    onClick={() => navigate('/admin?tab=categories')}
                    style={{ marginLeft: 8, padding: '0.5rem 1rem' }}
                >
                    Cancel
                </button>
            </form>
        </div>
    )
}
