import { useForm, FieldValues } from 'react-hook-form'
import { FaGoogle } from 'react-icons/fa6'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { FirebaseError } from '@firebase/util'
import { auth } from '../../../config/firebase'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import Input from '../../../components/Input'
import SubmitButton from '../../../components/SubmitButton'
import { useAppContext } from '../../../context/AppContext'
import { createUserDoc } from '../../../services/firestore'

const LoginForm = () => {

    const navigate = useNavigate()
    const { isDarkMode } = useAppContext()
    const { authUser } = useAuthContext()

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

    const loginAsGuest = async () => {
        try {
            await signInWithEmailAndPassword(auth, 'guest@forthdev.com', 'guestpass')
        } catch (error) {
            console.error(error)
        }
    }

    const loginWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, new GoogleAuthProvider())
            await createUserDoc(userCredential.user)
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
        const getUserIdAndRedirect = async (authUser: FirebaseUser) => {
            const userId = await createUserDoc(authUser)
            navigate(`/u/${userId}/campaigns`)
        }
        if (authUser) getUserIdAndRedirect(authUser)
    }, [authUser])

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

            <div className="flex flex-col">
                <button type="button" disabled={isSubmitting} onClick={loginAsGuest} className={`w-full p-4 mb-2 rounded shadow uppercase text-sm ${isDarkMode ? 'bg-slate-600 hover:bg-slate-500 text-white' : 'bg-slate-300 hover:bg-slate-200 text-black'}`}>Sign in as Guest</button>
                <button type="button" disabled={isSubmitting} onClick={loginWithGoogle} className={`w-full p-4 mb-2 rounded shadow uppercase text-sm ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    <div className="flex items-center justify-center gap-2">
                        <FaGoogle />
                        <span>Sign in with Google</span>
                    </div>
                </button>
            </div>            
        
        </form>
    )
}

export default LoginForm