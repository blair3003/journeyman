import { Link } from 'react-router-dom'
import RegistrationForm from '../../components/RegistrationForm'

const Register = () => {

    return (
        <section className="max-w-sm mx-auto mt-8 bg-gray-200 rounded-lg p-4">
            <h1 className="mb-4 font-bold text-xl uppercase text-black">Register</h1>
            <RegistrationForm />
            <Link to='/login' className="block p-4 bg-white border-gray-300 border-2 rounded text-black uppercase font-bold text-xs text-center">Already have an account?</Link>
        </section>        
    )
}

export default Register