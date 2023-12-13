import useMenu from '../../../hooks/useMenu'
import Menu from '../../../components/Menu'
import ProfilePic from '../../../components/ProfilePic'

interface PartyUserProps {
	user: User
	onRemove: (label: string) => void
}

const PartyUser = ({ user, onRemove }: PartyUserProps) => {

	const { menu, openMenu, closeMenu } = useMenu({
		'Remove from party': () => onRemove(user.uid)
	})

	return (
		<div className="relative">
			<button onClick={e => {e.preventDefault(); openMenu()}} title={user.displayName}>
                <span className="sr-only">{user.displayName}</span>
                <ProfilePic photoURL={user?.photoURL} displayName={user.displayName} />
			</button>
			<Menu menu={menu} onClose={closeMenu} />
		</div>
	)
}

export default PartyUser
