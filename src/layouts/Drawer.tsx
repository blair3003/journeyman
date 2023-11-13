import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLayoutContext } from '../context/LayoutContext'

const Drawer = () => {

    const location = useLocation()
    const { drawer, closeDrawer } = useLayoutContext()

    const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeDrawer()
    }

    useEffect(() => closeDrawer(), [location])

    useEffect(() => {
        window.addEventListener('keydown', handleEscKey)
        return () => window.removeEventListener('keydown', handleEscKey)
    }, [])

    return (
        <aside data-visible={!!drawer} className="fixed right-0 inset-y-0 z-50 translate-x-0 transition-transform data-[visible=false]:translate-x-full">
            <button type="button" onClick={() => closeDrawer()} className="w-full p-4 text-right">Close</button>
            {drawer}
        </aside>
    )
}

export default Drawer
