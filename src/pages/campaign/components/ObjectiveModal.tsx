import { useParams, useSearchParams } from 'react-router-dom'
import Objective from './Objective'
import Modal from '../../../components/Modal'
import { useDataContext } from '../../../context/DataContext'

const ObjectiveModal = () => {

	const { campaignId } = useParams()
	const [searchParams, setSearchParams] = useSearchParams() 
	const { objectives } = useDataContext()

	const objectiveId = searchParams.get('o')
	const objective = objectives.find(objective => objective.id === objectiveId)

	const onClose = () => {
		searchParams.delete('o')
		setSearchParams(searchParams)
	}

	if (!objective || !campaignId) return null

	return (
		<Modal title={`Objective #${objective.id}`} onClose={onClose}>
			<Objective campaignId={campaignId} objective={objective} />
		</Modal>
	)
}

export default ObjectiveModal
