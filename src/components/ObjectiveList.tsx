import { useLayoutContext } from '../context/LayoutContext'
import { HiPlus } from 'react-icons/hi2'
import Objective from './Objective'
import CreateObjective from './CreateObjective'

interface ObjectiveListProps {
	objectives: Objective[]
}

const ObjectiveList = ({ objectives }: ObjectiveListProps) => {

	const { openDrawer } = useLayoutContext()

	const missionId = objectives[0]?.mission

	const handleNewObjective = () => openDrawer(<CreateObjective missionId={missionId} />)
	
	return (
		<section className="flex flex-col">
			<h4 className="sr-only">Objectives</h4>
			<ol>
			{objectives.map(objective => (
				<li key={objective.id}>
					<Objective objective={objective} />
				</li>
			))}
	        </ol>
			<button onClick={handleNewObjective}>
				<span className="sr-only">New Objective</span>
				<HiPlus />
			</button>
		</section>
	)
}

export default ObjectiveList