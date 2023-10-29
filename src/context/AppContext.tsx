import { createContext, useContext } from 'react'
import useData from '../hooks/useData'

interface AppContextType {
    users: User[]
    campaigns: Campaign[]
    missions: Mission[]
    objectives: Objective[]
    isLoading: boolean
    isError: boolean
}

const AppContext = createContext({})

export const useAppContext = () => useContext(AppContext) as AppContextType

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const { resources: { users, campaigns, missions, objectives }, isLoading, isError } = useData()

    const value: AppContextType = {
        users,
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
