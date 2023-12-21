import { createContext, useContext } from 'react'
import useAuth from '../hooks/useAuth'

interface AuthContextType {
    authUser: FirebaseUser | null
    pending: boolean
}

const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext) as AuthContextType

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const { authUser, pending } = useAuth()

    const value: AuthContextType = {
        authUser,
        pending
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider> 
    )
}

export default AuthContext
