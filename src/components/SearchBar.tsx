import { HiMiniArrowRightOnRectangle } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const SearchBar = () => {

    return (
        <Link to="/logout" className="flex items-center gap-1 uppercase text-sm font-bold p-2 text-slate-500">
            Log out <HiMiniArrowRightOnRectangle />
        </Link>
    )
}

export default SearchBar