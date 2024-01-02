import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import DarkModeToggle from '../../components/DarkModeToggle'
import HomeLink from '../../components/HomeLink'

const Home = () => {

    const { isDarkMode } = useAppContext()

    return (
        <main className={`grow ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
            <section className={`max-w-md mt-8 mx-auto sm:rounded-lg p-4 shadow-xl ${isDarkMode ? 'bg-slate-950' : 'bg-slate-200'}`}>
                <header className="flex items-center justify-between mb-4">
                    <HomeLink />
                    <DarkModeToggle />
                </header>

                <div className="flex flex-col">
                    <Link to={`/login`} className="w-full p-4 mb-2 rounded bg-blue-800 text-slate-300 hover:bg-blue-700 uppercase text-sm text-center">Login</Link>
                    <Link to={`/register`} className="w-full p-4 mb-2 rounded bg-black text-slate-300 uppercase text-sm text-center">Register</Link>
                </div>  
            </section>
            
        </main>
    )
}

export default Home