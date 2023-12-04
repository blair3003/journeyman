import { useState } from 'react'

const useDarkMode = () => {

    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setIsDarkMode(isDarkMode => !isDarkMode)
    }

    return { isDarkMode, toggleDarkMode }
}

export default useDarkMode