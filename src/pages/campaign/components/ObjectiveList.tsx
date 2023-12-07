import { Link } from 'react-router-dom'
import { HiPlus } from 'react-icons/hi2'
import ObjectiveLink from './ObjectiveLink'

interface ObjectiveListProps {
	missionId: string
	objectives: Objective[]
}

const ObjectiveList = ({ missionId, objectives }: ObjectiveListProps) => {
	
	return (
		<section>
			<h4 className="sr-only">Objectives</h4>
			<div className="flex flex-col">
				<ol className="flex flex-col gap-2">
				{objectives.map(objective => (
					<li key={objective.uid}>
						<ObjectiveLink objective={objective} />
					</li>
				))}
				</ol>
				<Link to={`?createObjective=${missionId}`}>
					<span className="sr-only">New Objective</span>
					<HiPlus />
				</Link>
			</div>
		</section>
	)
}

export default ObjectiveList