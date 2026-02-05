import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { CartContext } from '../context/CartContext'

export default function ProductPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [qty, setQty] = useState(1)
    const { addToCart } = useContext(CartContext)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
                setProduct(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchProduct()
    }, [id])

    if (!product) return <div style={{ padding: 20 }}>Loading...</div>

    return (
        <div style={{ maxWidth: 900, margin: '2rem auto' }}>
            <div style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ flex: 1 }}>
                    <img src={`http://localhost:5000${product.image}`} alt={product.name} style={{ width: '100%' }} />
                </div>
                <div style={{ flex: 1 }}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p><strong>Price: </strong>Rs {product.price}</p>
                    <p><strong>Stock: </strong>{product.countInStock}</p>
                    <div>
                        <label>Qty: </label>
                        <input type='number' value={qty} min={1} max={product.countInStock} onChange={(e) => setQty(Number(e.target.value))} />
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                        <button onClick={() => addToCart(product, qty)} disabled={product.countInStock === 0}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
