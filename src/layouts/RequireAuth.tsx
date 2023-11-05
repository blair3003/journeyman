import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const RequireAuth = () => {

    const { auth } = useAuthContext()

    return (
        auth
		? <Outlet />
        : <Navigate to="/login" replace />
    )

}

export default RequireAuth
