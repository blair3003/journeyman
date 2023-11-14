import ObjectiveForm from './ObjectiveForm'

interface ObjectiveProps {
	objective: Objective
}

const Objective = ({ objective }: ObjectiveProps) => {

	return (
		<ObjectiveForm objective={objective} />
	)
}

export default Objective
