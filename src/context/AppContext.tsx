import { createContext, useContext } from 'react'
import useCampaigns from '../hooks/useCampaigns'

interface AppContextType {
    campaigns: Campaign[]
}

const AppContext = createContext({})

export const useAppContext = () => useContext(AppContext) as AppContextType

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const { campaigns } = useCampaigns()

    const value: AppContextType = {
        campaigns
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider> 
    )
}

export default AppContext
