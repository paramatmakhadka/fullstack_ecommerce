import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartPage() {
    const { cartItems, removeFromCart, updateQty } = useContext(CartContext)

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    return (
        <div style={{ maxWidth: 1000, margin: '2rem auto' }}>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <div>
                    Cart is empty. <Link to='/'>Go shopping</Link>
                </div>
            ) : (
                <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>Product</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item._id} style={{ borderTop: '1px solid #eee' }}>
                                    <td>{item.name}</td>
                                    <td>
                                        <input type='number' value={item.qty} min={1} max={item.countInStock} onChange={(e) => updateQty(item._id, Number(e.target.value))} style={{ width: 60 }} />
                                    </td>
                                    <td>Rs {(item.price * item.qty).toFixed(2)}</td>
                                    <td><button onClick={() => removeFromCart(item._id)}>Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                        <strong>Subtotal: Rs {subtotal.toFixed(2)}</strong>
                    </div>
                    <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                        <Link to='/checkout'><button disabled={cartItems.length === 0}>Proceed to Checkout</button></Link>
                    </div>
                </div>
            )}
        </div>
    )
}
