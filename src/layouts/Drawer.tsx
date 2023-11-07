import { useEffect } from 'react'
import { useLayoutContext } from '../context/LayoutContext'

const Drawer = () => {

    const drawerStyle = `fixed right-0 inset-y-0 z-50 translate-x-0 transition-transform data-[visible=false]:translate-x-full`
    const closeButtonStyle = `w-full p-4 text-right`
    
    const { drawer, closeDrawer } = useLayoutContext()

    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeDrawer()
        }
        window.addEventListener('keydown', handleEscKey)
        return () => window.removeEventListener('keydown', handleEscKey)
    }, [])

    return (
        <aside data-visible={!!drawer} className={drawerStyle}>
            <button type="button" onClick={() => closeDrawer()} className={closeButtonStyle}>Close</button>
            {drawer}
        </aside>
    )
}

export default Drawer
