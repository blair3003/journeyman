import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { useDataContext } from '../../../context/DataContext'
import { useLayoutContext } from '../../../context/LayoutContext'
import ObjectiveList from './ObjectiveList'
import MissionDetails from './MissionDetails'
import EditMissionDetails from './EditMissionDetails'
import useMenu from '../../../hooks/useMenu'
import Menu from '../../../components/Menu'

interface MissionProps {
	mission: Mission
}

const Mission = ({ mission }: MissionProps) => {

	const { objectives } = useDataContext()
	const missionObjectives: Objective[] = objectives.filter(objective => objective.mission === mission.uid)

	const { openDrawer } = useLayoutContext()
	const { menu, openMenu, closeMenu } = useMenu({
        	'Mission Details': () => openDrawer(<MissionDetails mission={mission} />),
        	'Edit Mission': () => openDrawer(<EditMissionDetails mission={mission} />)
    	})
	
	return (
		<section className="flex flex-col bg-slate-200 border-2 border-slate-500 rounded p-2 shadow-xl">
			<header className="flex justify-between items-start mb-2">
				<h3>{mission.title}</h3>
				<div className="relative">
					<button onClick={e => {e.preventDefault(); openMenu()}}>
						<span className="sr-only">Mission Menu</span>
						<HiEllipsisHorizontal />
					</button>
					<Menu menu={menu} onClose={closeMenu} />
				</div>
			</header>
			<ObjectiveList missionId={mission.uid} objectives={missionObjectives} />
		</section>
	)
}

export default Mission
