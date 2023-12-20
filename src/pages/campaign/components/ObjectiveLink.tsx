import { Link } from 'react-router-dom'
import { useAppContext } from '../../../context/AppContext'

interface ObjectiveLinkProps {
	objective: Objective
}

const ObjectiveLink = ({ objective }: ObjectiveLinkProps) => {

	const { isDarkMode } = useAppContext()

	return (
		<Link to={`?o=${objective.id}`} className={`block rounded-lg p-2 border-2 hover:border-slate-500 ${isDarkMode ? 'text-white bg-slate-900 border-slate-900' : 'text-black bg-slate-200 border-slate-200'}`}>
			<h5>{objective.title}</h5>
		</Link>
	)
}

export default ObjectiveLink