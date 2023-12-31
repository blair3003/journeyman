import useMenu from '../../../hooks/useMenu'
import Menu from '../../../components/Menu'

interface LabelProps {
	label: string
	color: string
	onRemove: (label: string) => void
}

const Label = ({ label, color, onRemove }: LabelProps) => {

	const { menu, openMenu, closeMenu } = useMenu({
		'Remove label': () => onRemove(label)
	})

	return (
		<div className="relative flex items-center">
			<button type="button" onClick={openMenu} style={{ backgroundColor: color }} className="w-9 h-6 rounded shadow-xl border-2 border-slate-300" title={label}>
				<span className="sr-only">{label}</span>
			</button>
			<Menu menu={menu} onClose={closeMenu} />
		</div>
	)
}

export default Label
