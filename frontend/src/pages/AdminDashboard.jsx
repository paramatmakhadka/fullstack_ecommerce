import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'

export default function AdminDashboard() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [stats, setStats] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const activeTab = searchParams.get('tab') || 'overview'
    const navigate = useNavigate()

    const setActiveTab = (tab) => {
        setSearchParams({ tab })
    }

    useEffect(() => {
        fetchProducts()
        fetchCategories()
        fetchUsers()
        fetchOrders()
        fetchStats()
    }, [])

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
            const { data } = await axios.get('http://localhost:5000/api/admin/users')
            setUsers(data)
        } catch (err) { console.error(err) }
    }

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/orders')
            setOrders(data)
        } catch (err) { console.error(err) }
    }

    const fetchStats = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/admin/stats')
            setStats(data)
        } catch (err) { console.error(err) }
    }

    const deleteProduct = async (id) => {
        if (!confirm('Delete this product?')) return
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`)
            fetchProducts()
            toast.success('Product deleted')
        } catch (err) {
            console.error(err)
            toast.error('Delete failed')
        }
    }

    const deleteCategory = async (id) => {
        if (!confirm('Delete this category?')) return
        try {
            await axios.delete(`http://localhost:5000/api/categories/${id}`)
            fetchCategories()
            toast.success('Category deleted')
        } catch (err) {
            console.error(err)
            toast.error('Delete failed')
        }
    }

    const deleteUser = async (id) => {
        if (!confirm('Delete this user?')) return
        try {
            await axios.delete(`http://localhost:5000/api/admin/users/${id}`)
            fetchUsers()
            toast.success('User deleted')
        } catch (err) {
            console.error(err)
            toast.error('Delete failed')
        }
    }

    return (
        <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '0 1rem' }}>
            <h1>Admin Dashboard</h1>
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc', marginBottom: '1rem', overflowX: 'auto' }}>
                <button onClick={() => setActiveTab('overview')} style={{ padding: '0.5rem 1rem', background: activeTab === 'overview' ? '#eee' : 'none', border: 'none', cursor: 'pointer', fontWeight: activeTab === 'overview' ? 'bold' : 'normal' }}>Overview</button>
                <button onClick={() => setActiveTab('products')} style={{ padding: '0.5rem 1rem', background: activeTab === 'products' ? '#eee' : 'none', border: 'none', cursor: 'pointer', fontWeight: activeTab === 'products' ? 'bold' : 'normal' }}>Products</button>
                <button onClick={() => setActiveTab('categories')} style={{ padding: '0.5rem 1rem', background: activeTab === 'categories' ? '#eee' : 'none', border: 'none', cursor: 'pointer', fontWeight: activeTab === 'categories' ? 'bold' : 'normal' }}>Categories</button>
                <button onClick={() => setActiveTab('users')} style={{ padding: '0.5rem 1rem', background: activeTab === 'users' ? '#eee' : 'none', border: 'none', cursor: 'pointer', fontWeight: activeTab === 'users' ? 'bold' : 'normal' }}>Users</button>
                <button onClick={() => setActiveTab('orders')} style={{ padding: '0.5rem 1rem', background: activeTab === 'orders' ? '#eee' : 'none', border: 'none', cursor: 'pointer', fontWeight: activeTab === 'orders' ? 'bold' : 'normal' }}>Orders</button>
            </div>

            {activeTab === 'overview' && stats && (
                <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #eee', borderRadius: 8, textAlign: 'center' }}>
                            <h3 style={{ margin: 0, color: '#888', fontSize: '14px' }}>TOTAL REVENUE</h3>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0.5rem 0' }}>Rs {stats.totalRevenue.toFixed(2)}</p>
                        </div>
                        <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #eee', borderRadius: 8, textAlign: 'center' }}>
                            <h3 style={{ margin: 0, color: '#888', fontSize: '14px' }}>ORDERS</h3>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0.5rem 0' }}>{stats.orderCount}</p>
                        </div>
                        <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #eee', borderRadius: 8, textAlign: 'center' }}>
                            <h3 style={{ margin: 0, color: '#888', fontSize: '14px' }}>PRODUCTS</h3>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0.5rem 0' }}>{stats.productCount}</p>
                        </div>
                        <div style={{ padding: '1.5rem', background: '#fff', border: '1px solid #eee', borderRadius: 8, textAlign: 'center' }}>
                            <h3 style={{ margin: 0, color: '#888', fontSize: '14px' }}>USERS</h3>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0.5rem 0' }}>{stats.userCount}</p>
                        </div>
                    </div>
                    {stats.salesData && stats.salesData.length > 0 && (
                        <div style={{ padding: '1rem', background: '#fff', border: '1px solid #eee', borderRadius: 8 }}>
                            <h3 style={{ marginTop: 0 }}>Sales (last 7 days)</h3>
                            <SalesChart data={stats.salesData} />
                        </div>
                    )}
                </div>
            )}

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
                                        <Link to={`/admin/category/${c._id}/edit`} style={{ marginRight: 8 }}><button>Edit</button></Link>
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '0.5rem' }}>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.isAdmin ? '✅' : '❌'}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Link to={`/admin/user/${u._id}/edit`} style={{ marginRight: 8 }}><button>Edit</button></Link>
                                        <button onClick={() => deleteUser(u._id)} style={{ color: 'red' }}>Delete</button>
                                    </td>
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
                                <th style={{ textAlign: 'left' }}>Payment</th>
                                <th style={{ textAlign: 'left' }}>Status</th>
                                <th style={{ textAlign: 'left' }}>Coupon</th>
                                <th style={{ textAlign: 'left' }}>Note</th>
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
                                            fontSize: '12px',
                                            background: o.isPaid ? '#d4edda' : '#fff3cd',
                                            color: o.isPaid ? '#155724' : '#856404'
                                        }}>
                                            {o.isPaid ? 'Received' : 'Pending'}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{
                                            padding: '2px 8px',
                                            borderRadius: 4,
                                            fontSize: '12px',
                                            background: o.status === 'Delivered' ? '#d4edda' : o.status === 'Canceled' ? '#f8d7da' : o.status === 'Refunded' ? '#d1ecf1' : '#efefef',
                                            color: o.status === 'Delivered' ? '#155724' : o.status === 'Canceled' ? '#721c24' : o.status === 'Refunded' ? '#0c5460' : '#333'
                                        }}>
                                            {o.status}
                                        </span>
                                    </td>
                                    <td style={{ fontSize: '13px' }}>{o.couponCode || '-'}</td>
                                    <td style={{ fontSize: '13px', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={o.specialNote}>
                                        {o.specialNote || '-'}
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

function SalesChart({ data, width = 800, height = 180, color = '#3b82f6' }) {
    if (!data || data.length === 0) return null
    const values = data.map(d => d.total)
    const labels = data.map(d => d.date.slice(5))
    const max = Math.max(...values, 1)
    const pad = 20
    const w = width
    const h = height
    const stepX = (w - pad * 2) / Math.max(1, values.length - 1)

    const points = values.map((v, i) => {
        const x = pad + i * stepX
        const y = pad + (1 - v / max) * (h - pad * 2)
        return `${x},${y}`
    }).join(' ')

    return (
        <div style={{ overflowX: 'auto' }}>
            <svg width={Math.min(w, 900)} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
                <polyline fill="none" stroke={color} strokeWidth="3" points={points} strokeLinecap="round" strokeLinejoin="round" />
                {values.map((v, i) => {
                    const x = pad + i * stepX
                    const y = pad + (1 - v / max) * (h - pad * 2)
                    return (
                        <g key={i}>
                            <circle cx={x} cy={y} r={3} fill={color} />
                            <text x={x} y={h - 4} fontSize={10} textAnchor="middle" fill="#666">{labels[i]}</text>
                        </g>
                    )
                })}
            </svg>
        </div>
    )
}
