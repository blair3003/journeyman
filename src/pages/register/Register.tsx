import { Link } from 'react-router-dom'
import RegistrationForm from './components/RegistrationForm'
import { useAppContext } from '../../context/AppContext'
import DarkModeToggle from '../../components/DarkModeToggle'

const Register = () => {

    const { isDarkMode } = useAppContext()

    return (
        <main className={`grow ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
            <section className={`max-w-md mx-auto mt-8 sm:rounded-lg p-4 shadow-xl ${isDarkMode ? 'bg-slate-950' : 'bg-slate-200'}`}>
                <header className="flex items-center justify-between mb-4">
                    <h1 className={`font-josefin text-2xl ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Register</h1>
                    <DarkModeToggle />
                </header>
                <RegistrationForm />
                <div className={`text-sm text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    <span>Already have an account? </span>
                    <Link to="/login" className="underline">Login now.</Link>
                </div>
            </section>        
        </main>
    )
}

export default Register