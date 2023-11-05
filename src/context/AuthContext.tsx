import { createContext, useContext } from 'react'
import useAuth from '../hooks/useAuth'

interface AuthContextType {
    auth: FirebaseUser | null
}

const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext) as AuthContextType

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const auth = useAuth()

    const value: AuthContextType = {
        auth
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider> 
    )
}

export default AuthContext
