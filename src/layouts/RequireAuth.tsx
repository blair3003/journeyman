import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

const RequireAuth = () => {

	const [authenticated, setAuthenticated] = useState(false)
	const [pending, setPending] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			user
			? setAuthenticated(true)
			: setAuthenticated(false)
			setPending(false)
		})
		return () => unsubscribe()
	}, [])

	if (pending) return null

	return (
        	authenticated
		? <Outlet />
        	: <Navigate to="/login" replace />
	)
}

export default RequireAuth
