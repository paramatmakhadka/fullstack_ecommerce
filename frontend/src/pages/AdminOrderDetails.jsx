import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'

export default function AdminOrderDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)
    const [status, setStatus] = useState('')
    const [isPaid, setIsPaid] = useState(false)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`)
                setOrder(data)
                setStatus(data.status)
                setIsPaid(data.isPaid)
            } catch (err) {
                console.error(err)
            }
        }
        fetchOrder()
    }, [id])

    const updateStatusHandler = async () => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status, isPaid })
            toast.success('Order updated')
            navigate('/admin')
        } catch (err) {
            console.error(err)
            toast.error('Update failed')
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

            {order.couponCode && (
                <div style={{ margin: '1rem 0', padding: '0.5rem 1rem', background: '#e8f4fd', borderLeft: '5px solid #2196F3' }}>
                    <strong>Coupon Applied:</strong> {order.couponCode}
                </div>
            )}

            {order.specialNote && (
                <div style={{ margin: '1rem 0', padding: '1rem', background: '#fff9c4', border: '1px solid #fbc02d', borderRadius: 8 }}>
                    <strong>Special Note:</strong>
                    <p style={{ margin: '0.5rem 0 0' }}>{order.specialNote}</p>
                </div>
            )}

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

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f9f9f9', border: '1px solid #eee', borderRadius: 8 }}>
                <h3>Update Order Status & Payment</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Order Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: '0.5rem', width: '200px' }}>
                            <option value="Pending">Pending</option>
                            <option value="Processed">Processed</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Canceled">Canceled</option>
                            <option value="Refunded">Refunded</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Payment Status</label>
                        <select value={isPaid} onChange={(e) => setIsPaid(e.target.value === 'true')} style={{ padding: '0.5rem', width: '200px' }}>
                            <option value="false">Pending</option>
                            <option value="true">Received</option>
                        </select>
                    </div>
                    <button onClick={updateStatusHandler} style={{ marginTop: '1.2rem', padding: '0.6rem 1.2rem', background: '#2c3e50', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Save Changes</button>
                </div>
            </div>
        </div>
    )
}
