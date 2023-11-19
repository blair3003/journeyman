import useMenu from '../../../hooks/useMenu'
import Menu from '../../../components/Menu'

interface LabelProps {
	label: string
	color: string
	onRemove: (label: string) => void
}

const Label = ({ label, color, onRemove }: LabelProps) => {

	const { menu, openMenu, closeMenu } = useMenu({
		'Remove': () => onRemove(label)
	})

	return (
		<div className="relative">
			<button onClick={e => {e.preventDefault(); openMenu()}} className={`bg-${color} w-6 h-4`}>
				<span className="sr-only">{label}</span>
			</button>
			<Menu menu={menu} onClose={closeMenu} />
		</div>
	)
}

export default Label
