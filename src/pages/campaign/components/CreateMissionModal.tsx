import { useParams, useSearchParams } from 'react-router-dom'
import CreateMissionForm from './CreateMissionForm'
import Modal from '../../../components/Modal'
import { useDataContext } from '../../../context/DataContext'

const CreateMissionModal = () => {

	const [searchParams, setSearchParams] = useSearchParams() 
    const { campaignId } = useParams()
	const { campaigns, missions, setCampaigns, setMissions } = useDataContext()

	const createMission = searchParams.has('createMission')
	const orderList = missions.filter(mission => mission.campaign === campaignId).map(mission => mission.order)
	const order = (orderList.length) ? Math.max(...orderList) + 1 : 0

	const onClose = () => {
		searchParams.delete('createMission')
		setSearchParams(searchParams)
	}

	const onCreate = (newMission: Mission) => {
		setMissions([newMission, ...missions])
		const campaign = campaigns.find(campaign => campaign.id === newMission.campaign)
		const campaignMissions = (campaign?.missions?.length) ? [...campaign.missions, newMission.id] : [newMission.id]
		const updatedCampaign = { ...campaign, missions: campaignMissions } as Campaign
		setCampaigns([...campaigns.filter(campaign => campaign.id !== newMission.campaign), updatedCampaign])
		onClose()
	}

	if (!campaignId || !createMission) return null

	return (
		<Modal title="Create Mission" onClose={onClose}>
			<CreateMissionForm campaignId={campaignId} order={order} onSubmit={onCreate} />
		</Modal>
	)
}

export default CreateMissionModal