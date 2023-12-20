import { Link } from 'react-router-dom'
import { HiPlus } from 'react-icons/hi2'
import ObjectiveLink from './ObjectiveLink'
import { useAppContext } from '../../../context/AppContext'

interface ObjectiveListProps {
	missionId: string
	objectives: Objective[]
}

const ObjectiveList = ({ missionId, objectives }: ObjectiveListProps) => {

	const { isDarkMode } = useAppContext()
	
	return (
		<section>
			<h4 className="sr-only">Objectives</h4>
			<div className="flex flex-col">
				<ol className="flex flex-col gap-2">
				{objectives.map(objective => (
					<li key={objective.id}>
						<ObjectiveLink objective={objective} />
					</li>
				))}
				</ol>
				<div className="w-full grid place-content-center p-2">
					<Link to={`?createObjective=${missionId}`} title="New Objective" className={`rounded-full w-12 h-12 grid place-content-center text-xl ${isDarkMode ? 'text-white hover:bg-slate-900' : 'text-black hover:bg-slate-300'}`}>
						<span className="sr-only">New Objective</span>
						<HiPlus />
					</Link>
				</div>
			</div>
		</section>
	)
}

export default ObjectiveList