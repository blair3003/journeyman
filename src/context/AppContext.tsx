import { createContext, useContext } from 'react'

interface AppContextType {
    data: null
}

const AppContext = createContext({})

export const useAppContext = () => useContext(AppContext) as AppContextType

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const data = null

    const value: AppContextType = {
        data
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider> 
    )
}

export default AppContext
