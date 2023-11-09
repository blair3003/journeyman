import { useSearchParams } from 'react-router-dom'
import Modal from './Modal'
import CreateObjectiveForm from './CreateObjectiveForm'

interface CreateObjectiveModalProps {
	missions: Mission[]
}

const CreateObjectiveModal = ({ missions }: CreateObjectiveModalProps) => {

	const [searchParams, setSearchParams] = useSearchParams() 

	const createObjective = searchParams.has('createObjective')
	const missionId = searchParams.get('createObjective')
	const mission = (missionId) ? missions.find(mission => mission.uid === missionId) : null

	const onClose = () => {
		searchParams.delete('createObjective')
		setSearchParams(searchParams)
	}

	if (!createObjective) return null

	return (
		<Modal title="Create Objective" onClose={onClose}>
			<CreateObjectiveForm missionId={mission?.uid} />
		</Modal>
	)
}

export default CreateObjectiveModal