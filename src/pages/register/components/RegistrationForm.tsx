import { useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword} from 'firebase/auth'
import { FirebaseError } from '@firebase/util'
import { auth} from '../../../config/firebase'
import Input from '../../../components/Input'
import SubmitButton from '../../../components/SubmitButton'
import { useAppContext } from '../../../context/AppContext'
import { createUserDoc } from '../../../services/firestore'
import { useAuthContext } from '../../../context/AuthContext'

const RegistrationForm = () => {

    const navigate = useNavigate() 
    const { isDarkMode } = useAppContext()
    const { authUser } = useAuthContext()

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
        const getUserIdAndRedirect = async (authUser: FirebaseUser) => {
            const userId = await createUserDoc(authUser)
            navigate(`/u/${userId}/campaigns`)
        }
        if (authUser) getUserIdAndRedirect(authUser)
    }, [authUser])

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
            <SubmitButton disabled={isSubmitting} label="Create Account" isDarkMode={isDarkMode} />        
        </form>
    )
}

export default RegistrationForm