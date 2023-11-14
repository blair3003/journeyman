import { createContext, useContext } from 'react'
import useAuth from '../hooks/useAuth'

interface AuthContextType {
    auth: FirebaseUser | null
    pending: boolean
}

const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext) as AuthContextType

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const { authUser: auth, pending } = useAuth()

    const value: AuthContextType = {
        auth,
        pending
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider> 
    )
}

export default AuthContext
