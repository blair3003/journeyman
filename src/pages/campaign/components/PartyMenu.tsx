import { useEffect, useRef } from 'react'
import { HiXMark } from 'react-icons/hi2'

interface PartyMenuProps {
	menu: Record<string, () => void> | null
    users: User[]
	onClose: () => void
}

const PartyMenu = ({ menu, users, onClose }: PartyMenuProps) => {

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
                {Object.keys(menu).map(key => {
                    const user = users.find(user => user.uid === key)
                    if (!user) return null
                    return (
                        <li key={user.uid}>
                            <button onClick={e => {e.preventDefault(); handleOptionCallback(menu[user.uid])}} className="w-6 h-6 rounded-full">
                                <span className="sr-only">{user.displayName}</span>
                                <span>U</span>
                            </button>
                        </li>
                    )
                })}
            </menu>
            <button onClick={e => {e.preventDefault(); handleClose()}} className="block w-full text-right">
            	<span className="sr-only">Close</span>
				<HiXMark />
			</button>
        </dialog>
	)
}

export default PartyMenu
