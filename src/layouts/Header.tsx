import HomeLink from '../components/HomeLink'
import SearchBar from '../components/SearchBar'
import DarkModeToggle from '../components/DarkModeToggle'

const Header = () => {

    return (
        <header>
            <HomeLink />
            <SearchBar />
            <DarkModeToggle />
        </header>
    )
}

export default Header