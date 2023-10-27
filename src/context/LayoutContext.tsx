import { createContext, useContext } from 'react'
import useDrawer from '../hooks/useDrawer'

interface LayoutContextType {
    drawer: JSX.Element | null
    openDrawer: (content: JSX.Element) => void
    closeDrawer: () => void
}

const LayoutContext = createContext({})

export const useLayoutContext = () => useContext(LayoutContext) as LayoutContextType

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {

    const { drawer, openDrawer, closeDrawer } = useDrawer()

    const value: LayoutContextType = {
        drawer,
        openDrawer,
        closeDrawer
    }

    return (
        <LayoutContext.Provider value={value}>
            {children}
        </LayoutContext.Provider> 
    )
}

export default LayoutContext
