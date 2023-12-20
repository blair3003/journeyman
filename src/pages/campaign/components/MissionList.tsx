import { Link } from 'react-router-dom'
import { HiPlus } from 'react-icons/hi2'
import Mission from './Mission'
import { useAppContext } from '../../../context/AppContext'

interface MissionListProps {
	missions: Mission[]
}

const MissionList = ({ missions }: MissionListProps) => {

	const { isDarkMode } = useAppContext()
	
	return (
		<section className={`grow overflow-x-scroll p-4 ${isDarkMode ? 'color-scheme-dark' : ''}`}>
			<h2 className="sr-only">Missions</h2>
			<div className="flex gap-4">
				<ol className="flex gap-4">
					{missions.sort((a,b) => a.order - b.order).map(mission => (
						<li key={mission.id}>
							<Mission mission={mission} />
						</li>
					))}
				</ol>
				<div>
					<div className="w-48 h-40 grid place-content-center">
						<Link to="?createMission" title="New Mission" className={`rounded-full w-12 h-12 grid place-content-center text-xl ${isDarkMode ? 'text-white bg-slate-950 hover:bg-slate-950/75' : 'text-black bg-slate-200 hover:bg-slate-300'}`}>
							<span className="sr-only">New Mission</span>
							<HiPlus />
						</Link>
					</div>
				</div>
			</div>
	    </section>
    )
	
}

export default MissionList