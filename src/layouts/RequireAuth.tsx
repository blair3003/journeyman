import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const RequireAuth = () => {

    const { auth } = useAuthContext()

    return <Outlet />

    // Todo: Fix this - On reload, auth not set yet so redirecting to Login
    return (
        auth
		? <Outlet />
        : <Navigate to="/login" replace />
    )

}

export default RequireAuth
