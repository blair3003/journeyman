import { useEffect, useRef } from 'react'
import { HiXMark } from 'react-icons/hi2'
import { options } from '../../../config/options'

interface LabelsMenuProps {
	menu: Record<string, () => void> | null
	onClose: () => void 
}

const LabelsMenu = ({ menu, onClose }: LabelsMenuProps) => {

	const menuRef = useRef<HTMLDialogElement | null>(null)
    const { labels: labelOptions } = options

    const handleClose = () => {
        onClose()
        menuRef.current?.close()
    }

    const handleOptionCallback = (callback: () => void) => {
        callback()
        handleClose()
    } 

    const handleOutsideClick = (event: MouseEvent) => (menuRef.current && !menuRef.current.contains(event.target as Node)) ? handleClose() : null
    const handleEscapeKey = (event: KeyboardEvent) => (event.key === 'Escape') ? handleClose() : null

	useEffect(() => {
		(menu)
		? menuRef.current?.show()
		: menuRef.current?.close()
	}, [menu])

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick)
        document.addEventListener('keydown', handleEscapeKey)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
            document.removeEventListener('keydown', handleEscapeKey)
        }
	}, [])

    if (!menu) return null
	
	return (
        <dialog ref={menuRef} className="absolute m-0 mt-2 top-full start-auto bg-blue-700 rounded px-2 py-1 text-white text-sm border-2 border-slate-600 shadow-xl z-10">
            <menu>
                {Object.keys(menu).map(option =>
                    <li key={option}>
                        <button onClick={e => {e.preventDefault(); handleOptionCallback(menu[option])}} style={{ backgroundColor: labelOptions[option as keyof typeof labelOptions] }} className="w-6 h-4 rounded border-2 border-slate-300 shadow-xl" title={option}>
                            <span className="sr-only">{option}</span>
                        </button>
                    </li>
                )}
            </menu>
            <button onClick={e => {e.preventDefault(); handleClose()}} className="w-6 h-6 grid place-content-center rounded-full mt-2 hover:bg-blue-800">
            	<span className="sr-only">Close</span>
				<HiXMark />
			</button>
        </dialog>
	)
}

export default LabelsMenu
