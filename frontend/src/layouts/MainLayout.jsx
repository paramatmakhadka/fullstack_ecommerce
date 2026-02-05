import React from 'react'
import { Outlet } from 'react-router-dom'
import ShopHeader from '../components/ShopHeader'

export default function MainLayout() {
    return (
        <div>
            <ShopHeader />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
