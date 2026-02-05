import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
    const {
        cartItems,
        removeFromCart,
        updateQty,
        couponCode,
        setCouponCode,
        specialNote,
        setSpecialNote
    } = useContext(CartContext);

    // Calculations based on the UI logic
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = 0.00;
    const taxRate = 0.13;
    const tax = subtotal * taxRate;
    const totalAmount = subtotal + shipping + tax;

    // Shared Styles
    const thStyle = {
        textAlign: 'left',
        padding: '15px 10px',
        borderBottom: '2px solid #f4f4f4',
        textTransform: 'capitalize'
    };

    const tdStyle = {
        padding: '15px 10px',
        verticalAlign: 'middle',
        borderBottom: '1px solid #eee'
    };

    const btnStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px'
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '40px auto', fontFamily: 'sans-serif', color: '#333' }}>
            {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h2>Your cart is empty</h2>
                    <Link to="/" style={{ color: '#1b7e52' }}>Go Shopping</Link>
                </div>
            ) : (
                <>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Action</th>
                                <th style={thStyle}>Photo</th>
                                <th style={thStyle}>Product</th>
                                <th style={thStyle}>Qty</th>
                                <th style={thStyle}>Price</th>
                                <th style={thStyle}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item._id}>
                                    {/* Action: Trash Icon */}
                                    <td style={tdStyle}>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4d4d', fontSize: '18px' }}
                                            title="Remove Item"
                                        >
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>

                                    {/* Photo */}
                                    <td style={tdStyle}>
                                        <img
                                            src={`http://localhost:5000${item.image}`}
                                            alt={item.name}
                                            style={{ width: '70px', height: '90px', objectFit: 'contain' }}
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/70x90?text=No+Image'; }}
                                        />
                                    </td>

                                    {/* Product Name */}
                                    <td style={{ ...tdStyle, width: '30%', fontWeight: '500' }}>
                                        {item.name}
                                    </td>

                                    {/* Quantity Input */}
                                    <td style={tdStyle}>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.qty}
                                            onChange={(e) => updateQty(item._id, Number(e.target.value))}
                                            style={{ width: '60px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                        />
                                    </td>

                                    {/* Unit Price */}
                                    <td style={tdStyle}>Rs {item.price.toFixed(2)}</td>

                                    {/* Line Total */}
                                    <td style={{ ...tdStyle, fontWeight: 'bold' }}>
                                        Rs {(item.price * item.qty).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>

                        {/* Left Section: Coupon & Notes */}
                        <div style={{ flex: '0 1 450px' }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                                <input
                                    type="text"
                                    placeholder="Coupon Code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                                <button style={{ ...btnStyle, backgroundColor: '#f8f9fa', border: '1px solid #ddd' }}>Apply</button>
                            </div>

                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                                Special Note for this order:
                            </label>
                            <textarea
                                placeholder="Message here"
                                value={specialNote}
                                onChange={(e) => setSpecialNote(e.target.value)}
                                style={{ width: '100%', height: '100px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', resize: 'none' }}
                            ></textarea>
                        </div>

                        {/* Right Section: Summary & Checkout */}
                        <div style={{ flex: '0 1 350px' }}>
                            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                                    <span>Sub Total :</span>
                                    <strong>Rs {subtotal.toFixed(2)}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                                    <span>Shipping :</span>
                                    <strong>Rs {shipping.toFixed(2)}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                                    <span>Tax (13%) :</span>
                                    <strong>Rs {tax.toFixed(2)}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0 10px', fontSize: '20px' }}>
                                    <strong>Amount :</strong>
                                    <strong style={{ color: '#000' }}>Rs {totalAmount.toFixed(2)}</strong>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                                <button style={{ ...btnStyle, backgroundColor: '#00cfeb', color: '#fff' }}>
                                    Update Cart
                                </button>
                                <Link to="/checkout">
                                    <button style={{ ...btnStyle, backgroundColor: '#1b7e52', color: '#fff' }}>
                                        Proceed to Checkout
                                    </button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </>
            )}
        </div>
    );
}