import { createContext, useContext, useState } from 'react'

const LayoutContext = createContext({})

interface LayoutContextType {
    drawerContent: JSX.Element | null
    setDrawerContent: React.Dispatch<React.SetStateAction<JSX.Element | null>>
}

export const useLayoutContext = () => useContext(LayoutContext) as LayoutContextType

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {

    const [drawerContent, setDrawerContent] = useState<JSX.Element | null>(<h1>Hello drawer !</h1>)

    return (
        <LayoutContext.Provider value={{
            drawerContent,
            setDrawerContent
        }}>
            {children}
        </LayoutContext.Provider> 
    )
}

export default LayoutProvider