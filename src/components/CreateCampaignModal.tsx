import { useSearchParams } from 'react-router-dom'
import CreateCampaignForm from './CreateCampaignForm'
import Modal from './Modal'

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
			<CreateCampaignForm userId={userId} />
		</Modal>
	)
}

export default CreateCampaignModal