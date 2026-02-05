import React, { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        const stored = localStorage.getItem('cart')
        if (stored) setCartItems(JSON.parse(stored))
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (product, qty = 1) => {
        setCartItems((prev) => {
            const exist = prev.find((i) => i._id === product._id)
            if (exist) {
                const updated = prev.map((i) => (i._id === product._id ? { ...i, qty: i.qty + qty } : i))
                toast.success(`${product.name} quantity updated in cart`)
                return updated
            }
            toast.success(`${product.name} added to cart`)
            return [...prev, { ...product, qty }]
        })
    }

    const removeFromCart = (id) => {
        setCartItems((prev) => {
            const removed = prev.find((i) => i._id === id)
            toast.success(`${removed ? removed.name : 'Item'} removed from cart`)
            return prev.filter((i) => i._id !== id)
        })
    }

    const updateQty = (id, qty) => {
        setCartItems((prev) => {
            const updated = prev.map((i) => (i._id === id ? { ...i, qty } : i))
            const item = prev.find(i => i._id === id)
            if (item) toast.info(`${item.name} quantity set to ${qty}`)
            return updated
        })
    }

    const clearCart = () => setCartItems([])

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
