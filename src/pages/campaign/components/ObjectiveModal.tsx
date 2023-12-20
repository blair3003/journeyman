import { useSearchParams } from 'react-router-dom'
import Objective from './Objective'
import Modal from '../../../components/Modal'

interface ObjectiveModalProps {
	objectives: Objective[]
	missions: Mission[]
}

const ObjectiveModal = ({ objectives, missions }: ObjectiveModalProps) => {

	const [searchParams, setSearchParams] = useSearchParams() 

	const objectiveId = searchParams.get('o')
	const objective = objectives.find(objective => objective.id === objectiveId)

	const onClose = () => {
		searchParams.delete('o')
		setSearchParams(searchParams)
	}

	if (!objective) return null

	return (
		<Modal title={`Objective #${objective.id}`} onClose={onClose}>
			<Objective objective={objective} missions={missions} />
		</Modal>
	)
}

export default ObjectiveModal
