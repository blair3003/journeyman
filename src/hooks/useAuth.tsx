import { useEffect, useState } from 'react'
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import usePersist from './usePersist'

const useAuth = () => {

    const { authUser, setAuthUser } = usePersist()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => setAuthUser(user))
        return () => unsubscribe()
    }, [])

    return authUser
}

export default useAuth
