import { useForm } from 'react-hook-form'
import { FaGoogle } from 'react-icons/fa6'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { FirebaseError } from '@firebase/util'
import { auth } from '../config/firebase'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext'

interface Inputs {
    email: string
    password: string
}

const LoginForm = () => {

    const navigate = useNavigate()
    const { auth: user } = useAuthContext()

    const { register, handleSubmit, setError, setFocus, formState: { errors, isSubmitting } } = useForm<Inputs>()

    const handleFirebaseError = (code: string) => {
        switch (code) {
            case 'auth/invalid-email':
            case 'auth/invalid-login-credentials':
                setError('email', { type: 'custom', message: 'Invalid Credentials' })
                break
            case 'auth/too-many-requests':
                setError('email', { type: 'custom', message: 'Login Attempts Exceeded' })
                break
            default:
                setError('email', { type: 'custom', message: 'Unknown Error' })
                console.error(code)
        }
    }

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider())
        } catch (error) {
            if (error instanceof FirebaseError) {
                handleFirebaseError(error.code)
            } else {
                console.error(error)
            }
        }
    }

    const loginWithCredentials = async ({ email, password }: Inputs) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            if (error instanceof FirebaseError) {
                handleFirebaseError(error.code)
            } else {
                console.error(error)
            }
        }
    }

    useEffect(() => {
        setFocus('email')
    }, [setFocus])

    useEffect(() => {
        if (user) navigate(`/u/${user.uid}/campaigns`)
    }, [user])

    return (
        <form onSubmit={handleSubmit(loginWithCredentials)}>

            <div className="bg-white border-gray-300 border-2 rounded p-2 mb-2">
                <div className="flex justify-between items-center mb-1">
                    <label htmlFor="email" className="text-black uppercase font-bold text-xs">Email</label>
                    {errors.email && <span className="text-red-500 uppercase font-bold text-xs">{errors.email.type === 'required' ? 'This field is required' : errors.email.message}</span>}
                </div>
                <input id="email" type="email" autoComplete="username" {...register('email', { required: true })} className="w-full bg-transparent" />
            </div>

            <div className="bg-white border-gray-300 border-2 rounded p-2 mb-2">
                <div className="flex justify-between items-center mb-1">
                    <label htmlFor="password" className="text-black uppercase font-bold text-xs">Password</label>
                    {errors.password && <span className="text-red-500 uppercase font-bold text-xs">{errors.password.type === 'required' ? 'This field is required' : errors.password.message}</span>}
                </div>
                <input id="password" type="password" autoComplete="current-password" {...register('password', { required: true })} className="w-full bg-transparent" />
            </div>
            
            <button type="submit" disabled={isSubmitting} className="w-full p-4 mb-2 bg-gray-900 border-gray-300 border-2 rounded">
				{isSubmitting ? <Loader size={16} /> : <span className="text-white uppercase font-bold text-xs">Continue</span>}
            </button>

            <div className="flex gap-2">
                <button type="button" disabled={isSubmitting} onClick={loginWithGoogle} className="w-full p-4 mb-2 bg-white border-gray-300 border-2 rounded">
                    {isSubmitting ? <Loader size={16} /> : <div className="flex items-center justify-center gap-2"><FaGoogle /><span className="text-black uppercase font-bold text-xs">Sign in with Google</span></div>}
                </button>
            </div>
            
        
        </form>
    )
}

export default LoginForm