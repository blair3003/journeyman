import { useLayoutContext } from '../../../context/LayoutContext'
import EditCampaignDetailsForm from './EditCampaignDetailsForm'
import CampaignDetails from './CampaignDetails'
import { useDataContext } from '../../../context/DataContext'

interface EditCampaignDetailsProps {
    campaign: Campaign
}

const EditCampaignDetails = ({ campaign }: EditCampaignDetailsProps) => {

    const { openDrawer } = useLayoutContext()
    const { campaigns, setCampaigns } = useDataContext()

    const onUpdate = (updatedCampaign: Campaign) => {
        setCampaigns([updatedCampaign, ...campaigns.filter(campaign => campaign.id !== updatedCampaign.id)])
        openDrawer(<CampaignDetails campaign={updatedCampaign} />)
    }

    return (
        <section className="p-4">
            <h2 className="uppercase text-sm font-bold p-2 text-slate-500">Edit Campaign Details</h2>
            <EditCampaignDetailsForm campaign={campaign} onSubmit={onUpdate} />
        </section>
    )
}

export default EditCampaignDetails