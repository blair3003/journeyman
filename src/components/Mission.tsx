import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { useDataContext } from '../context/DataContext'
import ObjectiveList from './ObjectiveList'
import MissionDetails from './MissionDetails'
import { useLayoutContext } from '../context/LayoutContext'

interface MissionProps {
	mission: Mission
}

const Mission = ({ mission }: MissionProps) => {

	const { objectives } = useDataContext()
	const myObjectives: Objective[] = objectives.filter(objective => objective.mission === mission.id)

	const { openDrawer } = useLayoutContext()

	// TODO: MissionMenu
	const handleMissionMenu = () => {
        console.log('MissionMenu open')

		//temp
		openDrawer(<MissionDetails mission={mission} />)
    }
	
	return (
		<section className="flex flex-col">
			<header className="flex justify-between items-start">
				<h3>{mission.title}</h3>
				<button onClick={handleMissionMenu}>
					<span className="sr-only">Mission Menu</span>
					<HiEllipsisHorizontal />
				</button>
			</header>
			<ObjectiveList objectives={myObjectives} />
		</section>
	)
}

export default Mission