import { createContext, useContext } from 'react'
import useDrawer from '../hooks/useDrawer'

const LayoutContext = createContext({})

interface LayoutContextType {
    drawer: Drawer
    openDrawer: (content: JSX.Element | null) => void
    closeDrawer: () => null
}

export const useLayoutContext = () => useContext(LayoutContext) as LayoutContextType

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {

    const { drawer, openDrawer, closeDrawer } = useDrawer()

    return (
        <LayoutContext.Provider value={{
            drawer,
            openDrawer,
            closeDrawer
        }}>
            {children}
        </LayoutContext.Provider> 
    )
}

export default LayoutProvider