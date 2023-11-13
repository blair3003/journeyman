import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { useDataContext } from '../context/DataContext'
import ObjectiveList from './ObjectiveList'
import MissionDetails from './MissionDetails'
import { useLayoutContext } from '../context/LayoutContext'
import useMoreOptionsMenu from '../hooks/useMoreOptionsMenu'
import MoreOptionsMenu from './MoreOptionsMenu'
import EditMissionDetails from './EditMissionDetails'

interface MissionProps {
	mission: Mission
}

const Mission = ({ mission }: MissionProps) => {

	const { objectives } = useDataContext()
	const missionObjectives: Objective[] = objectives.filter(objective => objective.mission === mission.uid)

	const { openDrawer } = useLayoutContext()
	const { menu, openMenu, closeMenu } = useMoreOptionsMenu({
        	'Mission Details': () => openDrawer(<MissionDetails mission={mission} />),
        	'Edit Mission': () => openDrawer(<EditMissionDetails mission={mission} />)
    	})
	
	return (
		<section className="flex flex-col">
			<header className="flex justify-between items-start">
				<h3>{mission.title}</h3>
				<div className="relative">
					<button onClick={e => {e.preventDefault(); openMenu()}}>
						<span className="sr-only">Mission Menu</span>
						<HiEllipsisHorizontal />
					</button>
					<MoreOptionsMenu menu={menu} onClose={closeMenu} />
				</div>
			</header>
			<ObjectiveList missionId={mission.uid} objectives={missionObjectives} />
		</section>
	)
}

export default Mission
