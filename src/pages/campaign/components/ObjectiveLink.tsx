import { Link } from 'react-router-dom'
import { useAppContext } from '../../../context/AppContext'
import { options } from '../../../config/options'
import { useDataContext } from '../../../context/DataContext'
import ProfilePic from '../../../components/ProfilePic'

interface ObjectiveLinkProps {
	objective: Objective
}

const ObjectiveLink = ({ objective }: ObjectiveLinkProps) => {

	const { isDarkMode } = useAppContext()
	const { users } = useDataContext()
	const { labels } = options

	return (
		<Link to={`?o=${objective.id}`} className={`block rounded-lg p-2 border-2 hover:border-slate-500 bg-blue-800/25 ${isDarkMode ? 'text-white border-slate-900' : 'text-black border-slate-200'}`}>
			<h5 className="text-base mb-2">{objective.title}</h5>
			{objective.labels?.length &&
				<div className="flex justify-start items-center grow flex-wrap gap-1 mb-2">
					{objective.labels.map(label => 
						<div key={label} style={{ backgroundColor: labels[label as keyof typeof labels] }} className="w-9 h-6 rounded shadow-xl border-2 border-slate-300" title={label}>
							<span className="sr-only">{label}</span>
						</div>
					)}
				</div>
			}			
			{objective.users?.length &&
				<div className="flex justify-start items-center grow flex-wrap gap-1 mb-2">
					{objective.users.map(user => {
                        const u = users.find(u => u.id === user)
                        if (!u) return null
                        return <ProfilePic key={u.id} photoURL={u?.displayPic} displayName={u.displayName} />
					})}
				</div>
			}
		</Link>
	)
}

export default ObjectiveLink