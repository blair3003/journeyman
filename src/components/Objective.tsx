interface ObjectiveProps {
	objective: Objective
}

const Objective = ({ objective }: ObjectiveProps) => {

	return (
		<div>
			<p>{objective.description}</p>
		</div>
	)
}

export default Objective