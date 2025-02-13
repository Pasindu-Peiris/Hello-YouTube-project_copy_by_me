import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRouters = () => {

    const isAuth = sessionStorage.getItem('isAuth')



    return isAuth ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRouters;