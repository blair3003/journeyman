import { useSearchParams } from 'react-router-dom'
import CreateMissionForm from './CreateMissionForm'
import Modal from './Modal'

interface CreateMissionModalProps {
	campaignId: string
}

const CreateMissionModal = ({ campaignId }: CreateMissionModalProps) => {

	const [searchParams, setSearchParams] = useSearchParams() 

	const createMission = searchParams.has('createMission')

	const onClose = () => {
		searchParams.delete('createMission')
		setSearchParams(searchParams)
	}

	if (!createMission) return null

	return (
		<Modal title="Create Mission" onClose={onClose}>
			<CreateMissionForm campaignId={campaignId} onSubmit={onClose} />
		</Modal>
	)
}

export default CreateMissionModal