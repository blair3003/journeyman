import ObjectiveForm from './ObjectiveForm'
import Messages from './Messages'
import { useDataContext } from '../../../context/DataContext'

interface ObjectiveProps {
	campaignId: string
	objective: Objective
}

const Objective = ({ campaignId, objective }: ObjectiveProps) => {

	const { objectives, setObjectives } = useDataContext()

	const onUpdate = (updatedObjective: Objective) => {		
		setObjectives([...objectives.filter(objective => objective.id !== updatedObjective.id), updatedObjective])		
	}

	return (
		<>
			<ObjectiveForm campaignId={campaignId} objective={objective} onSubmit={onUpdate} />
			<Messages objectiveId={objective.id} messages={objective.messages} />
		</>
	)
}

export default Objective
