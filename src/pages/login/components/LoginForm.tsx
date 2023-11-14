import { useForm, FieldValues } from 'react-hook-form'
import { FaGoogle } from 'react-icons/fa6'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { FirebaseError } from '@firebase/util'
import { auth } from '../../../config/firebase'
import Loader from '../../../components/Loader'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import Input from '../../../components/Input'
import SubmitButton from '../../../components/SubmitButton'

const LoginForm = () => {

    const navigate = useNavigate()
    const { auth: user } = useAuthContext()

    const {
        register,
        handleSubmit,
        setError,
        setFocus,
        formState: { errors, isSubmitting }
    } = useForm<FieldValues>()

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

    const loginWithCredentials = async ({ email, password }: FieldValues) => {
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
            
            <Input
                id="email"
                type="email"
                label="Email"
                autoComplete="username"
                register={register}
                errors={errors}
                required={true}
                disabled={isSubmitting}
            />
            
            <Input
                id="password"
                type="password"
                label="Password"
                autoComplete="current-password"
                register={register}
                errors={errors}
                required={true}
                disabled={isSubmitting}
            />

            <SubmitButton disabled={isSubmitting} label="Continue" />

            <div className="flex gap-2">
                <button type="button" disabled={isSubmitting} onClick={loginWithGoogle} className="w-full p-4 mb-2 bg-white border-gray-300 border-2 rounded">
                    {isSubmitting ? <Loader size={16} color="black" /> : <div className="flex items-center justify-center gap-2"><FaGoogle /><span className="text-black uppercase font-bold text-xs">Sign in with Google</span></div>}
                </button>
            </div>            
        
        </form>
    )
}

export default LoginForm