import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

export default function AdminProductForm() {
    const { id } = useParams()
    const isNew = !id || id === 'new'
    const navigate = useNavigate()
    const { token } = useContext(AuthContext)
    const [categories, setCategories] = useState([])
    const [uploading, setUploading] = useState(false)

    const [form, setForm] = useState({
        name: '',
        price: 0,
        image: '',
        brand: '',
        category: '',
        countInStock: 0,
        description: '',
    })

    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await axios.get('http://localhost:5000/api/categories')
            setCategories(data)
        }
        fetchCategories()

        if (!isNew) {
            const fetchProduct = async () => {
                try {
                    const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
                    setForm({
                        name: data.name || '',
                        price: data.price || 0,
                        image: data.image || '',
                        brand: data.brand || '',
                        category: data.category || '',
                        countInStock: data.countInStock || 0,
                        description: data.description || '',
                    })
                } catch (err) {
                    console.error(err)
                }
            }
            fetchProduct()
        }
    }, [id, isNew])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('image', file)
            const { data } = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
            })
            setForm({ ...form, image: data.filePath })
        } catch (err) {
            console.error(err)
            alert('Image upload failed')
        } finally {
            setUploading(false)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const headers = { Authorization: `Bearer ${token}` }
            if (isNew) {
                await axios.post('http://localhost:5000/api/products', form, { headers })
            } else {
                await axios.put(`http://localhost:5000/api/products/${id}`, form, { headers })
            }
            navigate('/admin')
        } catch (err) {
            console.error(err)
            alert('Save failed')
        }
    }

    return (
        <div style={{ maxWidth: 800, margin: '2rem auto' }}>
            <h2>{isNew ? 'Create Product' : 'Edit Product'}</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Name</label>
                    <input name='name' value={form.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Price</label>
                    <input name='price' type='number' value={form.price} onChange={handleChange} required />
                </div>
                <div>
                    <label>Image</label>
                    <input type='file' onChange={handleImageUpload} disabled={uploading} />
                    {uploading && <span> Uploading...</span>}
                    {form.image && <div style={{ marginTop: '0.5rem' }}>Current: {form.image}</div>}
                </div>
                <div>
                    <label>Brand</label>
                    <input name='brand' value={form.brand} onChange={handleChange} />
                </div>
                <div>
                    <label>Category</label>
                    <select name='category' value={form.category} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem' }}>
                        <option value=''>Select Category</option>
                        {categories.map((c) => (
                            <option key={c._id} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Count In Stock</label>
                    <input name='countInStock' type='number' value={form.countInStock} onChange={handleChange} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea name='description' value={form.description} onChange={handleChange} />
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <button type='submit'>Save</button>
                    <button type='button' onClick={() => navigate('/admin')} style={{ marginLeft: 8 }}>Cancel</button>
                </div>
            </form>
        </div>
    )
}