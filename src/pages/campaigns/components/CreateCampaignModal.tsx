import { useSearchParams } from 'react-router-dom'
import CreateCampaignForm from './CreateCampaignForm'
import Modal from '../../../components/Modal'

interface CreateCampaignModalProps {
	userId: string
}

const CreateCampaignModal = ({ userId }: CreateCampaignModalProps) => {

	const [searchParams, setSearchParams] = useSearchParams() 

	const createCampaign = searchParams.has('createCampaign')

	const onClose = () => {
		searchParams.delete('createCampaign')
		setSearchParams(searchParams)
	}

	if (!createCampaign) return null

	return (
		<Modal title="Create Campaign" onClose={onClose}>
			<CreateCampaignForm userId={userId} onSubmit={onClose} />
		</Modal>
	)
}

export default CreateCampaignModal