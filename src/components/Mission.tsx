import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { useAppContext } from '../context/AppContext'
import ObjectiveList from './ObjectiveList'

interface MissionProps {
	mission: Mission
}

const Mission = ({ mission }: MissionProps) => {

	const { objectives } = useAppContext()
	const myObjectives: Objective[] = objectives.filter(objective => objective.mission === mission.id)

	// TODO: MissionMenu
	const handleMissionMenu = () => {
        console.log('MissionMenu open')
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