import { createContext, useContext } from 'react'
import useData from '../hooks/useData'

interface DataContextType {
    users: User[]
    campaigns: Campaign[]
    missions: Mission[]
    objectives: Objective[]
    setUsers: (users: User[]) => void
    setCampaigns: (campaigns: Campaign[]) => void
    setMissions: (missions: Mission[]) => void
    setObjectives: (objectives: Objective[]) => void
    isLoading: boolean
    isError: boolean
}

const DataContext = createContext({})

export const useDataContext = () => useContext(DataContext) as DataContextType

export const DataProvider = ({ children }: { children: React.ReactNode }) => {

    const {
        resources: {
            users,
            campaigns,
            missions,
            objectives
        },
        setters: {
            setUsers,
            setCampaigns,
            setMissions,
            setObjectives
        },
        isLoading,
        isError
    } = useData()

    const value: DataContextType = {
        users,
        campaigns,
        missions,
        objectives,
        setUsers,
        setCampaigns,
        setMissions,
        setObjectives,
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
