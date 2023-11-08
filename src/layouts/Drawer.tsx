import { useEffect, useRef } from 'react'
import { useLayoutContext } from '../context/LayoutContext'

const Drawer = () => {

    const drawerRef = useRef<HTMLDialogElement | null>(null)
    const { drawer, closeDrawer } = useLayoutContext()

    const handleClose = () => {
        closeDrawer()
        drawerRef.current?.close()
    }

    const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleClose()
    }

    useEffect(() => {
        drawer
        ? drawerRef.current?.show()
        : drawerRef.current?.close()
    }, [drawer])

    useEffect(() => {
        window.addEventListener('keydown', handleEscKey)
        return () => window.removeEventListener('keydown', handleEscKey)
    }, [])

    return (
        <dialog ref={drawerRef} className="fixed m-0 h-auto start-auto right-0 inset-y-0 z-50">
            <button type="button" onClick={handleClose} className="w-full p-4 text-right">Close</button>
            {drawer}
        </dialog>
    )
}

export default Drawer