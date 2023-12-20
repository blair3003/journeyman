import { useEffect, useRef } from 'react'
import { HiXMark } from 'react-icons/hi2'
import ProfilePic from '../../../components/ProfilePic'

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
        <dialog ref={menuRef} className="absolute m-0 mt-2 top-full start-0 bg-blue-700 rounded px-2 py-1 text-white text-sm border-2 border-slate-600 shadow-xl z-10">
            <menu>
                {Object.keys(menu).map(key => {
                    const user = users.find(user => user.id === key)
                    if (!user) return null
                    return (
                        <li key={user.id} className="mb-2">
                            <button onClick={e => {e.preventDefault(); handleOptionCallback(menu[user.id])}} title={user.displayName}>
                                <span className="sr-only">{user.displayName}</span>
                                <ProfilePic photoURL={user?.displayPic} displayName={user.displayName} />
                            </button>
                        </li>
                    )
                })}
            </menu>
            <button onClick={e => {e.preventDefault(); handleClose()}} className="w-8 h-8 text-xl grid place-content-center rounded-full mt-2 hover:bg-blue-800">
            	<span className="sr-only">Close</span>
				<HiXMark />
			</button>
        </dialog>
	)
}

export default PartyMenu
