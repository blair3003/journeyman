import ObjectiveForm from './ObjectiveForm'

interface ObjectiveProps {
	objective: Objective
}

const Objective = ({ objective }: ObjectiveProps) => {

	return (
		<ObjectiveForm objective={objective} missions={missions} />
	)
}

export default Objective
