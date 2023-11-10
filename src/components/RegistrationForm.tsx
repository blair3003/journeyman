import { useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, createUserWithEmailAndPassword} from 'firebase/auth'
import { FirebaseError } from '@firebase/util'
import { auth} from '../config/firebase'
import Input from './Input'
import SubmitButton from './SubmitButton'

const RegistrationForm = () => {

    const navigate = useNavigate()

    const { register, handleSubmit, setError, setFocus, resetField, formState: { errors, isSubmitting } } = useForm<FieldValues>()

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

    const onSubmit = async ({ email, password }: FieldValues) => {
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
            <SubmitButton disabled={isSubmitting} label="Create Account" />        
        </form>
    )
}

export default RegistrationForm