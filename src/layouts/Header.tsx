import { Link } from 'react-router-dom'

const Header = () => {

    console.log(`Header rendered`)

    return (
        <header>
            <Link to="/">Home</Link>
        </header>
    )
}

export default Header