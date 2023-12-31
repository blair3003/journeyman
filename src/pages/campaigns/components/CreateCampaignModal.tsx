import { useSearchParams } from 'react-router-dom'
import CreateCampaignForm from './CreateCampaignForm'
import Modal from '../../../components/Modal'
import { useDataContext } from '../../../context/DataContext'

const CreateCampaignModal = () => {

	const [searchParams, setSearchParams] = useSearchParams()
    const { campaigns, setCampaigns } = useDataContext() 

	const createCampaign = searchParams.has('createCampaign')

	const onClose = () => {
		searchParams.delete('createCampaign')
		setSearchParams(searchParams)
	}

	const onCreate = (newCampaign: Campaign) => {
		setCampaigns([newCampaign, ...campaigns])
		onClose()
	}

	if (!createCampaign) return null

	return (
		<Modal title="Create Campaign" onClose={onClose}>
			<CreateCampaignForm onSubmit={onCreate} />
		</Modal>
	)
}

export default CreateCampaignModal