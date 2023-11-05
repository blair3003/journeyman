import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'

const Auth = () => {

    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    )

}

export default Auth