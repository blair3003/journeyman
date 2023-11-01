import { useLayoutContext } from '../context/LayoutContext'
import ObjectiveDetails from './ObjectiveDetails'

interface ObjectiveProps {
	objective: Objective
}

const Objective = ({ objective }: ObjectiveProps) => {

	const { openDrawer } = useLayoutContext()

	const handleObjective = () => openDrawer(<ObjectiveDetails objective={objective} />)

	return (
		<button onClick={handleObjective} className="cursor-pointer">
			<h5>{objective.title}</h5>
		</button>
	)
}

export default Objective