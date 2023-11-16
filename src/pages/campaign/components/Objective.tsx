import ObjectiveForm from './ObjectiveForm'

interface ObjectiveProps {
	objective: Objective
	missions: Mission[]
}

const Objective = ({ objective, missions }: ObjectiveProps) => {

	return (
		<ObjectiveForm objective={objective} missions={missions} />
	)
}

export default Objective
