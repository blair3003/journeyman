import { Link } from 'react-router-dom'

interface ObjectiveLinkProps {
	objective: Objective
}

const ObjectiveLink = ({ objective }: ObjectiveLinkProps) => {

	return (
		<Link to={`?o=${objective.uid}`}>
			<h5>{objective.title}</h5>
		</Link>
	)
}

export default ObjectiveLink