import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { HiMiniXMark } from 'react-icons/hi2'
import { useLayoutContext } from '../context/LayoutContext'
import { useAppContext } from '../context/AppContext'

const Drawer = () => {

    const location = useLocation()
    const { isDarkMode } = useAppContext()
    const { drawer, closeDrawer } = useLayoutContext()
    const closeRef = useRef<HTMLButtonElement>(null)

    const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeDrawer()
    }

    useEffect(() => closeDrawer(), [location])

    useEffect(() => {
        window.addEventListener('keydown', handleEscKey)
        return () => window.removeEventListener('keydown', handleEscKey)
    }, [])

    useEffect(() => {
        if (closeRef.current && drawer) {
            closeRef.current.focus()
        }
    }, [closeRef, drawer])

    return (
        <aside data-visible={!!drawer} className={`fixed right-0 inset-y-0 z-50 w-4/5 sm:w-[25rem] translate-x-0 transition-transform data-[visible=false]:translate-x-full shadow-xl border-l-2 ${isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100'}`}>
            <button ref={closeRef} type="button" onClick={() => closeDrawer()} className={`rounded-full m-2 ml-auto w-12 h-12 grid place-content-center text-xl ${isDarkMode ? 'text-white hover:bg-slate-900 focus:bg-slate-900' : 'text-black hover:bg-slate-100 focus:bg-slate-100'}`}>
                <span className="sr-only">Close Drawer</span>
                <HiMiniXMark />
            </button>
            {drawer}
        </aside>
    )
}

export default Drawer
