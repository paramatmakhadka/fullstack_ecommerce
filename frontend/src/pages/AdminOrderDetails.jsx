import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

export default function AdminOrderDetails() {
    const { id } = useParams()
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)
    const [status, setStatus] = useState('')

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setOrder(data)
                setStatus(data.status)
            } catch (err) {
                console.error(err)
            }
        }
        fetchOrder()
    }, [id, token])

    const updateStatusHandler = async () => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            alert('Status updated')
            navigate('/admin')
        } catch (err) {
            console.error(err)
            alert('Update failed')
        }
    }

    if (!order) return <div style={{ padding: 20 }}>Loading...</div>

    return (
        <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
            <button onClick={() => navigate('/admin')} style={{ marginBottom: '1rem' }}>Back to Dashboard</button>
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Customer:</strong> {order.user ? order.user.name : order.shippingAddress.name + ' (Guest)'}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            <div style={{ margin: '1.5rem 0', padding: '1rem', border: '1px solid #ddd', borderRadius: 8 }}>
                <h3>Shipping Information</h3>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
            </div>

            <div style={{ margin: '1.5rem 0' }}>
                <h3>Order Items</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #eee' }}>
                            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.orderItems.map((item, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '0.5rem' }}>{item.name}</td>
                                <td style={{ textAlign: 'center' }}>{item.qty}</td>
                                <td style={{ textAlign: 'center' }}>Rs {item.price}</td>
                                <td style={{ textAlign: 'center' }}>Rs {(item.qty * item.price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                    <strong>Total Price: Rs {order.totalPrice.toFixed(2)}</strong>
                </div>
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', background: '#f9f9f9', border: '1px solid #eee' }}>
                <h3>Update Order Status</h3>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: '0.5rem' }}>
                        <option value="Pending">Pending</option>
                        <option value="Processed">Processed</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                    <button onClick={updateStatusHandler}>Update Status</button>
                </div>
            </div>
        </div>
    )
}
