import { useState } from 'react'

const useDrawer = () => {

    const [drawer, setDrawer] = useState<Drawer>({ content: null, open: false })

    const openDrawer = (content: JSX.Element | null) => setDrawer({ content, open: true })
    const closeDrawer = () => setDrawer({ content: null, open: false })

    return { drawer, openDrawer, closeDrawer }
}

export default useDrawer