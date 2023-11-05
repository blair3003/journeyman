import { createContext, useContext } from 'react'
import useData from '../hooks/useData'

interface DataContextType {
    users: User[]
    campaigns: Campaign[]
    missions: Mission[]
    objectives: Objective[]
    isLoading: boolean
    isError: boolean
}

const DataContext = createContext({})

export const useDataContext = () => useContext(DataContext) as DataContextType

export const DataProvider = ({ children }: { children: React.ReactNode }) => {

    const { resources: { users, campaigns, missions, objectives }, isLoading, isError } = useData()

    const value: DataContextType = {
        users,
        campaigns,
        missions,
        objectives,
        isLoading,
        isError
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider> 
    )
}

export default DataContext
