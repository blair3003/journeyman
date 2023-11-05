import { Link } from 'react-router-dom'
import RegistrationForm from '../components/RegistrationForm'

const Register = () => {

    return (
        <section className="max-w-sm mx-auto mt-8 bg-gray-200 rounded-lg p-4">
            <h1 className="mb-4 font-bold text-xl uppercase text-black">Register</h1>
            <RegistrationForm />
            <div className="block text-black text-xs text-center">
                <span>Already have an account? </span>
                <Link to="/login" className="text-gray-950 underline">Login now.</Link>
            </div>
        </section>        
    )
}

export default Register