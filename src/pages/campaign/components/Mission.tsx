import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { useDataContext } from '../../../context/DataContext'
import { useLayoutContext } from '../../../context/LayoutContext'
import ObjectiveList from './ObjectiveList'
import MissionDetails from './MissionDetails'
import EditMissionDetails from './EditMissionDetails'
import useMenu from '../../../hooks/useMenu'
import Menu from '../../../components/Menu'
import { useAppContext } from '../../../context/AppContext'

interface MissionProps {
	mission: Mission
}

const Mission = ({ mission }: MissionProps) => {

	const { isDarkMode } = useAppContext()
	const { objectives } = useDataContext()
	const missionObjectives: Objective[] = objectives.filter(objective => objective.mission === mission.id)

	const { openDrawer } = useLayoutContext()
	const { menu, openMenu, closeMenu } = useMenu({
        	'Mission Details': () => openDrawer(<MissionDetails mission={mission} />),
        	'Edit Mission': () => openDrawer(<EditMissionDetails mission={mission} />)
    	})
	
	return (
		<section className={`flex flex-col border-2 rounded-lg p-2 shadow-xl ${isDarkMode ? 'text-white bg-slate-950 border-slate-800' : 'text-black bg-slate-100 border-slate-200'}`}>
			<header className="flex justify-between items-start mb-4">
				
				<button onClick={e => {e.preventDefault(); openDrawer(<MissionDetails mission={mission} />)}}>
					<h3>{mission.title}</h3>
				</button>
				
				<div className="relative">
					<button onClick={e => {e.preventDefault(); openMenu()}}>
						<span className="sr-only">Mission Menu</span>
						<HiEllipsisHorizontal />
					</button>
					<Menu menu={menu} onClose={closeMenu} />
				</div>
			</header>
			<ObjectiveList missionId={mission.id} objectives={missionObjectives} />
		</section>
	)
}

export default Mission
