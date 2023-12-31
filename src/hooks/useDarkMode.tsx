import { useState } from 'react'

const useDarkMode = () => {

    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode')?.toLowerCase() === 'true' || false)

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
        localStorage.setItem('darkMode', JSON.stringify(!isDarkMode))
    }

    return { isDarkMode, toggleDarkMode }
}

export default useDarkMode