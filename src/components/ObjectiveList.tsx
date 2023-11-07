import { useLayoutContext } from '../context/LayoutContext'
import { HiPlus } from 'react-icons/hi2'
import ObjectiveLink from './ObjectiveLink'
import CreateObjective from './CreateObjective'

interface ObjectiveListProps {
	objectives: Objective[]
}

const ObjectiveList = ({ objectives }: ObjectiveListProps) => {

	const { openDrawer } = useLayoutContext()

	const missionId = objectives[0]?.mission

	const handleNewObjective = () => openDrawer(<CreateObjective missionId={missionId} />)
	
	return (
		<section>
			<h4 className="sr-only">Objectives</h4>
			<div className="flex flex-col">
				<ol>
				{objectives.map(objective => (
					<li key={objective.uid}>
						<ObjectiveLink objective={objective} />
					</li>
				))}
				</ol>
				<button onClick={handleNewObjective}>
					<span className="sr-only">New Objective</span>
					<HiPlus />
				</button>
			</div>
		</section>
	)
}

export default ObjectiveList