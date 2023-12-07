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
import { useAppContext } from '../../../context/AppContext'

const LoginForm = () => {

    const navigate = useNavigate()
    const { isDarkMode } = useAppContext()
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
                isDarkMode={isDarkMode}
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
                isDarkMode={isDarkMode}
            />

            <SubmitButton disabled={isSubmitting} label="Continue" isDarkMode={isDarkMode} />

            <div className="flex gap-2">
                <button type="button" disabled={isSubmitting} onClick={loginWithGoogle} className={`w-full p-4 mb-2 rounded shadow ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    {isSubmitting ? <Loader size={16} color={isDarkMode ? 'white' : 'black'} /> : <div className="flex items-center justify-center gap-2"><FaGoogle /><span className="uppercase text-sm">Sign in with Google</span></div>}
                </button>
            </div>            
        
        </form>
    )
}

export default LoginForm