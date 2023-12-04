import HomeLink from '../components/HomeLink'
import SearchBar from '../components/SearchBar'
import DarkModeToggle from '../components/DarkModeToggle'
import { useAppContext } from '../context/AppContext'

const Header = () => {

    const { isDarkMode } = useAppContext()

    return (
        <header className={`flex justify-between items-center border-b-2 ${isDarkMode ? "bg-slate-950 border-slate-900" : "bg-white border-slate-100"}`}>
            <HomeLink />
            <SearchBar />
            <DarkModeToggle />
        </header>
    )
}

export default Header