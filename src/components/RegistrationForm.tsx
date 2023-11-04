import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, createUserWithEmailAndPassword} from 'firebase/auth'
import { FirebaseError } from '@firebase/util'
import { auth} from '../config/firebase'
import Loader from './Loader'

interface Inputs {
    email: string
    password: string
}

const RegistrationForm = () => {

    const navigate = useNavigate()

    const { register, handleSubmit, setError, setFocus, resetField, formState: { errors, isSubmitting } } = useForm<Inputs>()

    const handleFirebaseError = (code: string) => {
        switch (code) {
            case 'auth/email-already-in-use':
                setError('email', { type: 'custom', message: 'Email Exists' })
                resetField('password')
                break
            case 'auth/weak-password':
                setError('password', { type: 'custom', message: 'Weak Password' })
                break
            default:
                console.error(code)
        }
    }

    const onSubmit = async ({ email, password }: Inputs) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
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
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) navigate(`/u/${user.uid}/campaigns`)
        })
        return () => unsubscribe()
    }, [navigate])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

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

            <button disabled={isSubmitting} className="w-full p-4 mb-2 bg-gray-900 border-gray-300 border-2 rounded">
				{isSubmitting ? <Loader size={16} /> : <span className="text-white uppercase font-bold text-xs">Register</span>}
            </button>
        
        </form>
    )
}

export default RegistrationForm