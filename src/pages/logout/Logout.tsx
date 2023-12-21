import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase'

const Logout = () => {

    const navigate = useNavigate()
    
    useEffect(() => {
        const handleSignOut = async () => {
            await signOut(auth)
            navigate('/login', { replace: true })
        }
        handleSignOut()
    }, [navigate])

    return null
}

export default Logout