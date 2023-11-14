import { useLayoutContext } from '../../../context/LayoutContext'
import EditCampaignDetailsForm from './EditCampaignDetailsForm'
import CampaignDetails from './CampaignDetails'

interface EditCampaignDetailsProps {
    campaign: Campaign
}

const EditCampaignDetails = ({ campaign }: EditCampaignDetailsProps) => {

    const { openDrawer } = useLayoutContext()

    const onUpdate = (updatedCampaign: Campaign) => {
        console.log('Campaign updated')
        console.log(updatedCampaign)
        openDrawer(<CampaignDetails campaign={updatedCampaign} />)
    }

    return (
        <section>
            <h2>Edit Campaign Details</h2>
            <EditCampaignDetailsForm campaign={campaign} onSubmit={onUpdate} />
        </section>
    )
}

export default EditCampaignDetails