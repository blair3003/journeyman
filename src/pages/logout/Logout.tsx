import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase'

const Logout = () => {

    const navigate = useNavigate()

    const handleSignOut = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            if (error instanceof Error) console.error(error.message)
        } finally {
            navigate('/login', { replace: true })
        }
    }

    useEffect(() => {
        handleSignOut()
    }, [])

    return null
}

export default Logout