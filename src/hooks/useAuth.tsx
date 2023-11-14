import { useEffect, useState } from 'react'
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const useAuth = () => {

    const [authUser, setAuthUser] = useState<FirebaseUser | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => setAuthUser(user))
        return () => unsubscribe()
    }, [])

    return authUser
}

export default useAuth
