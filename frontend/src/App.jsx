import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminRoute from './components/AdminRoute'
import AdminProductForm from './pages/AdminProductForm'
import AdminCategoryForm from './pages/AdminCategoryForm'
import AdminUserForm from './pages/AdminUserForm'
import AdminOrderDetails from './pages/AdminOrderDetails'
import { CartProvider } from './context/CartContext'

export default function App() {
    return (
        <CartProvider>
            <div>
                <Header />
                <main>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/register' element={<RegisterPage />} />
                        <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                        <Route path='/product/:id' element={<ProductPage />} />
                        <Route path='/cart' element={<CartPage />} />
                        <Route path='/checkout' element={<CheckoutPage />} />
                        <Route path='/admin' element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                        <Route path='/admin/product/new' element={<AdminRoute><AdminProductForm /></AdminRoute>} />
                        <Route path='/admin/product/:id/edit' element={<AdminRoute><AdminProductForm /></AdminRoute>} />
                        <Route path='/admin/category/new' element={<AdminRoute><AdminCategoryForm /></AdminRoute>} />
                        <Route path='/admin/user/new' element={<AdminRoute><AdminUserForm /></AdminRoute>} />
                        <Route path='/admin/order/:id' element={<AdminRoute><AdminOrderDetails /></AdminRoute>} />
                    </Routes>
                </main>
            </div>
        </CartProvider>
    )
}
