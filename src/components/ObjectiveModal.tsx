import { useSearchParams } from 'react-router-dom'
import Objective from './Objective'
import Modal from './Modal'

interface ObjectiveModalProps {
	objectives: Objective[]
}

const ObjectiveModal = ({ objectives }: ObjectiveModalProps) => {

	const [searchParams, setSearchParams] = useSearchParams() 

	const objectiveId = searchParams.get('o')
	const objective = objectives.find(objective => objective.uid === objectiveId)

	const onClose = () => {
		searchParams.delete('o')
		setSearchParams(searchParams)
	}

	if (!objective) return null

	return (
		<Modal title={`Objective #${objective.uid}`} onClose={onClose}>
			<Objective objective={objective} />
		</Modal>
	)
}

export default ObjectiveModal
