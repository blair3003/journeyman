import ObjectiveForm from './ObjectiveForm'
import Messages from './Messages'

interface ObjectiveProps {
	objective: Objective
	missions: Mission[]
}

const Objective = ({ objective, missions }: ObjectiveProps) => {

	return (
		<>
			<ObjectiveForm objective={objective} missions={missions} />
			<Messages objectiveID={objective.uid} messages={objective.messages} />
		</>
	)
}

export default Objective
