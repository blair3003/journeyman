import { createContext, useContext } from 'react'
import useData from '../hooks/useData'

interface AppContextType {
    campaigns: Campaign[]
    missions: Mission[]
    objectives: Objective[]
    isLoading: boolean
    isError: boolean
}

const AppContext = createContext({})

export const useAppContext = () => useContext(AppContext) as AppContextType

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const { campaigns, missions, objectives, isLoading, isError } = useData()

    const value: AppContextType = {
        campaigns,
        missions,
        objectives,
        isLoading,
        isError
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider> 
    )
}

export default AppContext
