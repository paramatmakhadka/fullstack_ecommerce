import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function AdminDashboard() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [activeTab, setActiveTab] = useState('products')
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        fetchProducts()
        fetchCategories()
        fetchUsers()
        fetchOrders()
    }, [token])

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/products')
            setProducts(data)
        } catch (err) { console.error(err) }
    }

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/categories')
            setCategories(data)
        } catch (err) { console.error(err) }
    }

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/users', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUsers(data)
        } catch (err) { console.error(err) }
    }

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/orders', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setOrders(data)
        } catch (err) { console.error(err) }
    }

    const deleteProduct = async (id) => {
        if (!confirm('Delete this product?')) return
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchProducts()
        } catch (err) {
            console.error(err)
            alert('Delete failed')
        }
    }

    const deleteCategory = async (id) => {
        if (!confirm('Delete this category?')) return
        try {
            await axios.delete(`http://localhost:5000/api/categories/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchCategories()
        } catch (err) {
            console.error(err)
            alert('Delete failed')
        }
    }

    return (
        <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '0 1rem' }}>
            <h1>Admin Dashboard</h1>
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
                <button onClick={() => setActiveTab('products')} style={{ padding: '0.5rem 1rem', background: activeTab === 'products' ? '#eee' : 'none', border: 'none', cursor: 'pointer' }}>Products</button>
                <button onClick={() => setActiveTab('categories')} style={{ padding: '0.5rem 1rem', background: activeTab === 'categories' ? '#eee' : 'none', border: 'none', cursor: 'pointer' }}>Categories</button>
                <button onClick={() => setActiveTab('users')} style={{ padding: '0.5rem 1rem', background: activeTab === 'users' ? '#eee' : 'none', border: 'none', cursor: 'pointer' }}>Users</button>
                <button onClick={() => setActiveTab('orders')} style={{ padding: '0.5rem 1rem', background: activeTab === 'orders' ? '#eee' : 'none', border: 'none', cursor: 'pointer' }}>Orders</button>
            </div>

            {activeTab === 'products' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h2>Products</h2>
                        <Link to='/admin/product/new'><button>Create Product</button></Link>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f4f4f4' }}>
                                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Name</th>
                                <th style={{ textAlign: 'left' }}>Price</th>
                                <th style={{ textAlign: 'left' }}>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '0.5rem' }}>{p.name}</td>
                                    <td>Rs {p.price}</td>
                                    <td>{p.countInStock}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Link to={`/admin/product/${p._id}/edit`} style={{ marginRight: 8 }}><button>Edit</button></Link>
                                        <button onClick={() => deleteProduct(p._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'categories' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h2>Categories</h2>
                        <Link to='/admin/category/new'><button>Create Category</button></Link>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f4f4f4' }}>
                                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((c) => (
                                <tr key={c._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '0.5rem' }}>{c.name}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button onClick={() => deleteCategory(c._id)} style={{ color: 'red' }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'users' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h2>Users</h2>
                        <Link to='/admin/user/new'><button>Create User</button></Link>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f4f4f4' }}>
                                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Name</th>
                                <th style={{ textAlign: 'left' }}>Email</th>
                                <th style={{ textAlign: 'left' }}>Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '0.5rem' }}>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.isAdmin ? '✅' : '❌'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'orders' && (
                <div>
                    <h2>Orders</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f4f4f4' }}>
                                <th style={{ textAlign: 'left', padding: '0.5rem' }}>ID</th>
                                <th style={{ textAlign: 'left' }}>Customer</th>
                                <th style={{ textAlign: 'left' }}>Date</th>
                                <th style={{ textAlign: 'left' }}>Total</th>
                                <th style={{ textAlign: 'left' }}>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => (
                                <tr key={o._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '0.5rem' }}>{o._id.substring(0, 8)}...</td>
                                    <td>{o.user ? o.user.name : o.shippingAddress.name + ' (Guest)'}</td>
                                    <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                                    <td>Rs {o.totalPrice.toFixed(2)}</td>
                                    <td>
                                        <span style={{
                                            padding: '2px 8px',
                                            borderRadius: 4,
                                            background: o.status === 'Delivered' ? '#d4edda' : o.status === 'Canceled' ? '#f8d7da' : '#efefef'
                                        }}>
                                            {o.status}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button onClick={() => navigate(`/admin/order/${o._id}`)}>Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
