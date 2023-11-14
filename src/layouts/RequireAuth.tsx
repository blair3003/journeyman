import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const RequireAuth = () => {

	const { auth, pending } = useAuthContext()
	
	if (pending) return null

	return (
        	auth
		? <Outlet />
        	: <Navigate to="/login" replace />
	)
}

export default RequireAuth
