import { useParams, useSearchParams } from 'react-router-dom'
import Modal from '../../../components/Modal'
import CreateObjectiveForm from './CreateObjectiveForm'
import { useDataContext } from '../../../context/DataContext'

const CreateObjectiveModal = () => {

	const { campaignId } = useParams()
	const [searchParams, setSearchParams] = useSearchParams()
	const { missions, objectives, setMissions, setObjectives } = useDataContext()
	
	const createObjective = searchParams.has('createObjective')
	const missionId = searchParams.get('createObjective')

	const mission = (missionId) ? missions.find(mission => mission.id === missionId) : null

	const onClose = () => {
		searchParams.delete('createObjective')
		setSearchParams(searchParams)
	}

	const onCreate = (newObjective: Objective) => {
		setObjectives([newObjective, ...objectives])
		const mission = missions.find(mission => mission.id === newObjective.mission)
		const updatedMission = { ...mission, objectives: [...mission?.objectives!, newObjective.id] } as Mission
		setMissions([...missions.filter(mission => mission.id !== updatedMission.id), updatedMission])
		onClose()
	}

	if (!campaignId || !createObjective) return null

	return (
		<Modal title="Create Objective" onClose={onClose}>
			<CreateObjectiveForm campaignId={campaignId} missionId={mission?.id} onSubmit={onCreate} />
		</Modal>
	)
}

export default CreateObjectiveModal