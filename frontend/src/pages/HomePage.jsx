import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { CartContext } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

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
        <div className="container my-4">
            <h3 className="mb-4">Latest Products</h3>

            <div className="row g-4">
                {products.map((p) => (
                    <div key={p._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <ProductCard product={p} addToCart={addToCart} />
                    </div>
                ))}
            </div>
        </div>
    )
}
