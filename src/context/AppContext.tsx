import { createContext, useContext } from 'react'
import useDarkMode from '../hooks/useDarkMode'

interface AppContextType {
    isDarkMode: boolean
    toggleDarkMode: () => void
}

const AppContext = createContext({})

export const useAppContext = () => useContext(AppContext) as AppContextType

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const { isDarkMode, toggleDarkMode } = useDarkMode()

    const value: AppContextType = {
        isDarkMode,
        toggleDarkMode
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider> 
    )
}

export default AppContext
