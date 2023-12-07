import { Link } from 'react-router-dom'

interface ObjectiveLinkProps {
	objective: Objective
}

const ObjectiveLink = ({ objective }: ObjectiveLinkProps) => {

	return (
		<Link to={`?o=${objective.uid}`} className="block bg-slate-300 border-2 border-slate-500 rounded p-2">
			<h5>{objective.title}</h5>
		</Link>
	)
}

export default ObjectiveLink