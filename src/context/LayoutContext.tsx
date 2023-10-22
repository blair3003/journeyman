import { createContext, useContext, useState } from 'react'

const LayoutContext = createContext({})

interface LayoutContextType {
    drawerContent: JSX.Element | null
    handleDrawer: (content?: JSX.Element) => null
}

export const useLayoutContext = () => useContext(LayoutContext) as LayoutContextType

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {

    const [drawerContent, setDrawerContent] = useState<JSX.Element | null>(null)

    const handleDrawer = (content: JSX.Element | null = null) => {
        setDrawerContent(content)
        // open drawer
    }

    return (
        <LayoutContext.Provider value={{
            drawerContent,
            handleDrawer
        }}>
            {children}
        </LayoutContext.Provider> 
    )
}

export default LayoutProvider