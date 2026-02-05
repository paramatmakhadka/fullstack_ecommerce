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
        /* UI Change: Used container class and improved top margin */
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3 mb-0">Admin Dashboard</h1>
            </div>

            {/* UI Change: Converted buttons to Bootstrap Nav Tabs */}
            <ul className="nav nav-tabs mb-4 border-bottom-0 shadow-sm rounded bg-white">
                {['overview', 'products', 'categories', 'users', 'orders'].map((tab) => (
                    <li className="nav-item" key={tab}>
                        <button
                            onClick={() => setActiveTab(tab)}
                            className={`nav-link border-0 py-3 px-4 text-capitalize ${activeTab === tab ? 'active border-bottom border-primary border-3 fw-bold' : 'text-muted'}`}
                        >
                            {tab}
                        </button>
                    </li>
                ))}
            </ul>

            {activeTab === 'overview' && stats && (
                <div className="animate__animated animate__fadeIn">
                    {/* UI Change: Used Bootstrap Grid and Cards for Stats */}
                    <div className="row g-4 mb-5">
                        <div className="col-md-3">
                            <div className="card border-0 shadow-sm h-100 p-3">
                                <div className="card-body text-center">
                                    <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Total Revenue</h6>
                                    <h2 className="fw-bold mb-0">Rs {stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card border-0 shadow-sm h-100 p-3">
                                <div className="card-body text-center">
                                    <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Orders</h6>
                                    <h2 className="fw-bold mb-0">{stats.orderCount}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card border-0 shadow-sm h-100 p-3">
                                <div className="card-body text-center">
                                    <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Products</h6>
                                    <h2 className="fw-bold mb-0">{stats.productCount}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card border-0 shadow-sm h-100 p-3">
                                <div className="card-body text-center">
                                    <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Users</h6>
                                    <h2 className="fw-bold mb-0">{stats.userCount}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    {stats.salesData && stats.salesData.length > 0 && (
                        <div className="card border-0 shadow-sm p-4">
                            <h5 className="card-title mb-4 fw-bold">Sales (last 7 days)</h5>
                            <SalesChart data={stats.salesData} />
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'products' && (
                <div className="card border-0 shadow-sm p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="h4 mb-0">Products</h2>
                        <Link to='/admin/product/new' className="btn btn-primary px-4">Create Product</Link>
                    </div>
                    {/* UI Change: Applied table-hover and responsive classes */}
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th className="px-3">Name</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th className="text-end px-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p._id}>
                                        <td className="px-3 fw-medium">{p.name}</td>
                                        <td>Rs {p.price}</td>
                                        <td>
                                            <span className={`badge ${p.countInStock > 0 ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                                                {p.countInStock}
                                            </span>
                                        </td>
                                        <td className="text-end px-3">
                                            <Link to={`/admin/product/${p._id}/edit`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                                            <button onClick={() => deleteProduct(p._id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'categories' && (
                <div className="card border-0 shadow-sm p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="h4 mb-0">Categories</h2>
                        <Link to='/admin/category/new' className="btn btn-primary px-4">Create Category</Link>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th className="px-3">Name</th>
                                    <th className="text-end px-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((c) => (
                                    <tr key={c._id}>
                                        <td className="px-3">{c.name}</td>
                                        <td className="text-end px-3">
                                            <Link to={`/admin/category/${c._id}/edit`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                                            <button onClick={() => deleteCategory(c._id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'users' && (
                <div className="card border-0 shadow-sm p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="h4 mb-0">Users</h2>
                        <Link to='/admin/user/new' className="btn btn-primary px-4">Create User</Link>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th className="px-3">Name</th>
                                    <th>Email</th>
                                    <th>Admin Status</th>
                                    <th className="text-end px-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u._id}>
                                        <td className="px-3">{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            {u.isAdmin ? <span className="badge rounded-pill bg-primary">Admin</span> : <span className="badge rounded-pill bg-light text-dark">User</span>}
                                        </td>
                                        <td className="text-end px-3">
                                            <Link to={`/admin/user/${u._id}/edit`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                                            <button onClick={() => deleteUser(u._id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'orders' && (
                <div className="card border-0 shadow-sm p-4">
                    <h2 className="h4 mb-4">Orders</h2>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle" style={{ fontSize: '0.9rem' }}>
                            <thead className="table-light">
                                <tr>
                                    <th className="px-3">ID</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                    <th>Coupon</th>
                                    <th>Note</th>
                                    <th className="text-end px-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o._id}>
                                        <td className="px-3 text-muted">{o._id.substring(0, 8)}</td>
                                        <td>{o.user ? o.user.name : o.shippingAddress.name + ' (Guest)'}</td>
                                        <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                                        <td className="fw-bold">Rs {o.totalPrice.toFixed(2)}</td>
                                        <td>
                                            {/* UI Change: Replaced custom inline status labels with Bootstrap Badges */}
                                            <span className={`badge px-3 py-2 ${o.isPaid ? 'bg-success-subtle text-success border border-success' : 'bg-warning-subtle text-warning border border-warning'}`}>
                                                {o.isPaid ? 'Received' : 'Pending'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge px-3 py-2 ${o.status === 'Delivered' ? 'bg-success' :
                                                o.status === 'Canceled' ? 'bg-danger' :
                                                    o.status === 'Refunded' ? 'bg-info text-dark' : 'bg-secondary'
                                                }`}>
                                                {o.status}
                                            </span>
                                        </td>
                                        <td style={{ fontSize: '0.85rem' }}>{o.couponCode || '-'}</td>
                                        <td style={{ fontSize: '0.85rem', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={o.specialNote}>
                                            {o.specialNote || '-'}
                                        </td>
                                        <td className="text-end px-3">
                                            <button onClick={() => navigate(`/admin/order/${o._id}`)} className="btn btn-sm btn-dark">Details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

function SalesChart({ data, width = 800, height = 220, color = '#0d6efd' }) {
    if (!data || data.length === 0) return null
    const values = data.map(d => d.total)
    const labels = data.map(d => d.date.slice(5))
    const max = Math.max(...values, 1)
    const pad = 30
    const w = width
    const h = height
    const stepX = (w - pad * 2) / Math.max(1, values.length - 1)

    const points = values.map((v, i) => {
        const x = pad + i * stepX
        const y = pad + (1 - v / max) * (h - pad * 2)
        return `${x},${y}`
    }).join(' ')

    return (
        <div className="table-responsive">
            <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet" className="d-block mx-auto">
                <polyline fill="none" stroke={color} strokeWidth="3" points={points} strokeLinecap="round" strokeLinejoin="round" />
                {values.map((v, i) => {
                    const x = pad + i * stepX
                    const y = pad + (1 - v / max) * (h - pad * 2)
                    return (
                        <g key={i}>
                            <circle cx={x} cy={y} r={4} fill="#fff" stroke={color} strokeWidth="2" />
                            <text x={x} y={h - 4} fontSize={11} textAnchor="middle" fill="#adb5bd" fontWeight="500">{labels[i]}</text>
                        </g>
                    )
                })}
            </svg>
        </div>
    )
}