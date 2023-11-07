import { HiPlus } from 'react-icons/hi2'
import { useLayoutContext } from '../context/LayoutContext'
import Mission from './Mission'
import CreateMission from './CreateMission'

interface MissionListProps {
	missions: Mission[]
}

const MissionList = ({ missions }: MissionListProps) => {

	const { openDrawer } = useLayoutContext()

	const campaignId = missions[0]?.campaign

	const handleNewMission = () => openDrawer(<CreateMission campaignId={campaignId} />)

	return (
		<section>
			<h2 className="sr-only">Missions</h2>
			<div className="flex">
				<ol>
				{missions.map(mission => (
					<li key={mission.uid}>
						<Mission mission={mission} />
					</li>
				))}
				</ol>
				<button onClick={handleNewMission}>
					<span className="sr-only">New Mission</span>
					<HiPlus />
				</button>
			</div>
	    </section>
    )
	
}

export default MissionList