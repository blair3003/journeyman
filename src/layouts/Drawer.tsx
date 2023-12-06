import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { HiMiniXMark } from 'react-icons/hi2'
import { useLayoutContext } from '../context/LayoutContext'
import { useAppContext } from '../context/AppContext'

const Drawer = () => {

    const location = useLocation()
    const { isDarkMode } = useAppContext()
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
        <aside data-visible={!!drawer} className={`fixed right-0 inset-y-0 z-50 w-[25rem] translate-x-0 transition-transform data-[visible=false]:translate-x-full shadow-xl border-l-2 ${isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100'}`}>
            <button type="button" onClick={() => closeDrawer()} className="w-full p-4 flex justify-end">
                <span className="sr-only">Close Drawer</span>
                <HiMiniXMark className={`hover:scale-150 ${isDarkMode ? 'text-white' : 'text-black'}`} />
            </button>
            {drawer}
        </aside>
    )
}

export default Drawer
