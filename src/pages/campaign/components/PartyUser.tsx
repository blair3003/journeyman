import useMenu from '../../../hooks/useMenu'
import Menu from '../../../components/Menu'

interface PartyUserProps {
	user: User
	onRemove: (label: string) => void
}

const PartyUser = ({ user, onRemove }: PartyUserProps) => {

	const { menu, openMenu, closeMenu } = useMenu({
		'Remove': () => onRemove(user.uid)
	})

	return (
		<div className="relative">
			<button onClick={e => {e.preventDefault(); openMenu()}} className="w-6 h-6 rounded-full">
                <span className="sr-only">{user.displayName}</span>
                <span>U</span>
			</button>
			<Menu menu={menu} onClose={closeMenu} />
		</div>
	)
}

export default PartyUser
