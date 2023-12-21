import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const RequireAuth = () => {

	const { authUser, pending } = useAuthContext()
	
	if (pending) return null

	return (
		authUser
		? <Outlet />
        : <Navigate to="/login" replace />
	)
}

export default RequireAuth
