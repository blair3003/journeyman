import { createContext, useContext, useState } from 'react'

const LayoutContext = createContext({})

interface LayoutContextType {
    isDrawerOpen: boolean
    drawerContent: JSX.Element | null
    toggleDrawer: (content?: JSX.Element) => null
}

export const useLayoutContext = () => useContext(LayoutContext) as LayoutContextType

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [drawerContent, setDrawerContent] = useState<JSX.Element | null>(null)

    const toggleDrawer = (content: JSX.Element | null = null) => {
        setDrawerContent(content)
        setIsDrawerOpen(!!content)
    }

    return (
        <LayoutContext.Provider value={{
            isDrawerOpen,
            drawerContent,
            toggleDrawer
        }}>
            {children}
        </LayoutContext.Provider> 
    )
}

export default LayoutProvider