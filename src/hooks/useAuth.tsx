import { useEffect, useState } from 'react'
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const useAuth = () => {

    const [authUser, setAuthUser] = useState<FirebaseUser | null>(null)
    const [pending, setPending] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setAuthUser(user)
            setPending(false)
        })
        return () => unsubscribe()
    }, [])

    return { authUser, pending }
}

export default useAuth
