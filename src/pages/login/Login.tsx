import { Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'

const Login = () => {

    return (
        <section className="max-w-sm mx-auto mt-8 bg-gray-200 rounded-lg p-4">
            <h1 className="mb-4 font-bold text-xl uppercase text-black">Login</h1>
            <LoginForm />
            <div className="block text-black text-xs text-center">
                <span>Don't have an account? </span>
                <Link to="/register" className="text-gray-950 underline">Register now.</Link>
            </div>
        </section>
    )
}

export default Login