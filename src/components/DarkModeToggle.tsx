import { HiMiniMoon, HiMiniSun } from 'react-icons/hi2'
import { useAppContext } from '../context/AppContext'

const DarkModeToggle = () => {

    const { isDarkMode, toggleDarkMode } = useAppContext()

    return (
        <button
            onClick={toggleDarkMode}
            type="button"
            title="Toggle Dark Mode"
            className={`p-2 ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}
        >
            <span className="sr-only">{isDarkMode ? "Turn off Dark Mode" : "Turn on Dark Mode"}</span>
            {isDarkMode ? <HiMiniMoon /> : <HiMiniSun />}
        </button>
    )
}

export default DarkModeToggle