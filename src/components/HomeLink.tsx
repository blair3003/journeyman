import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const HomeLink = () => {

    const { isDarkMode } = useAppContext()

    return (
        <Link
            to="/"
            className="py-2 px-4 flex items-center justify-start gap-1"
        >
            <span className={`font-josefin text-2xl ${isDarkMode ? "text-white" : "text-black"}`}>Journeyman</span>
            <img src="/img/journeyman-logo.png" alt="Journeyman logo" className="max-h-8"/>
        </Link>
    )
}

export default HomeLink