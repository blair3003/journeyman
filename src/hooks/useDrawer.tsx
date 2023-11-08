import { useState } from 'react'

interface Drawer {
    drawer: JSX.Element | null;
    openDrawer: (content: JSX.Element) => void;
    closeDrawer: () => void;
}

const useDrawer = (): Drawer => {

    const [drawer, setDrawer] = useState<JSX.Element | null>(null)

    const openDrawer = (content: JSX.Element) => setDrawer(content)
    const closeDrawer = () => setDrawer(null)

    return { drawer, openDrawer, closeDrawer }
}

export default useDrawer