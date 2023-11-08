import { useEffect, useState } from 'react'

const usePersist = () => {

    const persist = localStorage.getItem('persist')

    const [authUser, setAuthUser] = useState<FirebaseUser | null>(persist ? JSON.parse(persist) : null)

    useEffect(() => {
        (authUser)
        ? localStorage.setItem('persist', JSON.stringify(authUser))
        : localStorage.removeItem('persist')
    }, [authUser])

    return { authUser, setAuthUser }
}

export default usePersist