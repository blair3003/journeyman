import { Link } from 'react-router-dom'
import { HiPlus } from 'react-icons/hi2'
import Mission from './Mission'

interface MissionListProps {
	missions: Mission[]
}

const MissionList = ({ missions }: MissionListProps) => {

	return (
		<section>
			<h2 className="sr-only">Missions</h2>
			<div className="flex gap-4">
				<ol className="flex gap-4">
					{missions.map(mission => (
						<li key={mission.uid}>
							<Mission mission={mission} />
						</li>
					))}
				</ol>
				<Link to="?createMission">
					<span className="sr-only">New Mission</span>
					<HiPlus />
				</Link>
			</div>
	    </section>
    )
	
}

export default MissionList