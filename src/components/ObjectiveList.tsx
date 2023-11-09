import { Link } from 'react-router-dom'
import { HiPlus } from 'react-icons/hi2'
import ObjectiveLink from './ObjectiveLink'

interface ObjectiveListProps {
	objectives: Objective[]
}

const ObjectiveList = ({ objectives }: ObjectiveListProps) => {

	const missionId = objectives[0]?.mission
	
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
				<Link to={`?createObjective=${missionId}`}>
					<span className="sr-only">New Mission</span>
					<HiPlus />
				</Link>
			</div>
		</section>
	)
}

export default ObjectiveList