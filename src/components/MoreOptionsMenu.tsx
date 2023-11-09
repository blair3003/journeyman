import { useEffect, useRef } from 'react'
import { HiXMark } from 'react-icons/hi2'

interface MoreOptionsMenuProps {
	menu: Record<string, () => void> | null
	onClose: () => void
}

const MoreOptionsMenu = ({ menu, onClose }: MoreOptionsMenuProps) => {

	const menuRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        onClose()
        menuRef.current?.close()
    }

    const handleOptionCallback = (callback: () => void) => {
        callback()
        handleClose()
    }

	useEffect(() => {
		(menu)
		? menuRef.current?.show()
		: menuRef.current?.close()
	}, [menu])

    if (!menu) return null
	
	return (
        <dialog ref={menuRef} className="absolute m-0 start-0 bg-green-500">
            <menu>
                {Object.keys(menu).map(option =>
                    <li key={option}><button onClick={e => {e.preventDefault(); handleOptionCallback(menu[option])}}>{option}</button></li>
                )}
            </menu>
            <button onClick={e => {e.preventDefault(); handleClose()}} className="block w-full text-right">
            	<span className="sr-only">Close</span>
				<HiXMark />
			</button>
        </dialog>
	)
}

export default MoreOptionsMenu