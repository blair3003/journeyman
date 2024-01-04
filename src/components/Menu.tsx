import { useEffect, useRef, useState } from 'react'
import { HiXMark } from 'react-icons/hi2'

interface MenuProps {
	menu: Record<string, () => void> | null
	onClose: () => void
}

const Menu = ({ menu, onClose }: MenuProps) => {

	const menuRef = useRef<HTMLDialogElement | null>(null)
    const [positionLeft, setPositionLeft] = useState(true)
    const [displayWidth, setDisplayWidth] = useState(window.innerWidth)

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
    const updateDisplayWidth = () => setDisplayWidth(window.innerWidth)

    const getPosition = () => {
        const m = menuRef.current?.parentElement
        const rect = m?.getBoundingClientRect()
        if (rect) {            
            (rect.x > displayWidth / 2)
                ? setPositionLeft(true)
                : setPositionLeft(false)
        }
    }

	useEffect(() => {
		getPosition()
	}, [menu, displayWidth])

	useEffect(() => {
		(menu)
		? menuRef.current?.show()
		: menuRef.current?.close()
	}, [menu])

	useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick)
        document.addEventListener('keydown', handleEscapeKey)
        window.addEventListener('resize', updateDisplayWidth)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
            document.removeEventListener('keydown', handleEscapeKey)
            window.removeEventListener('resize', updateDisplayWidth)
        }
	}, [])

    if (!menu) return null
	
	return (
        <dialog ref={menuRef} className={`absolute m-0 mt-2 top-full right-0 bg-blue-700 rounded px-2 py-1 text-white text-sm shadow-xl z-10 ${positionLeft ? 'start-auto' : 'start-0'}`}>
            <menu className="">
                {Object.keys(menu).map(option =>
                    <li key={option}><button onClick={e => {e.preventDefault(); handleOptionCallback(menu[option])}} className="w-full text-left p-1 border-b-2 border-blue-800/25 whitespace-nowrap">{option}</button></li>
                )}
            </menu>
            <button onClick={e => {e.preventDefault(); handleClose()}} className="w-full p-1 flex justify-end">
            	<span className="sr-only">Close</span>
				<HiXMark />
			</button>
        </dialog>
	)
}

export default Menu