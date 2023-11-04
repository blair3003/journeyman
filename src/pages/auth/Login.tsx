import { Link } from 'react-router-dom'
import LoginForm from '../../components/LoginForm'

const Login = () => {

    return (
        <section className="max-w-sm mx-auto mt-8 bg-gray-200 rounded-lg p-4">
            <h1 className="mb-4 font-bold text-xl uppercase text-black">Log in</h1>
            <LoginForm />
            <Link to='/register' className="block p-4 bg-white border-gray-300 border-2 rounded text-black uppercase font-bold text-xs text-center">Register</Link>
        </section>
    )
}

export default Login