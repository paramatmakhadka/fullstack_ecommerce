import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

export default function HomePage() {
    const [products, setProducts] = useState([])
    const { addToCart } = useContext(CartContext)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products')
                setProducts(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div style={{ maxWidth: 1000, margin: '1rem auto' }}>
            <h2>Products</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
                {products.map((p) => (
                    <div key={p._id} style={{ border: '1px solid #ddd', padding: '1rem' }}>
                        <img src={`http://localhost:5000${p.image}`} alt={p.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                        <h3>{p.name}</h3>
                        <p>{p.description}</p>
                        <strong>Rs {p.price}</strong>
                        <div style={{ marginTop: '0.5rem' }}>
                            <Link to={`/product/${p._id}`} style={{ marginRight: '0.5rem' }}>View</Link>
                            <button onClick={() => addToCart(p, 1)} disabled={p.countInStock === 0}>Add To Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
