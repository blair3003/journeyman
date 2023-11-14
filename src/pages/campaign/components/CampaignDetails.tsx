import { HiPencil } from 'react-icons/hi2'
import { useLayoutContext } from '../../../context/LayoutContext'
import EditCampaignDetails from './EditCampaignDetails'

interface CampaignDetailsProps {
    campaign: Campaign
}

const CampaignDetails = ({ campaign }: CampaignDetailsProps) => {

    const { openDrawer } = useLayoutContext()

    const handleEdit = () => openDrawer(<EditCampaignDetails campaign={campaign} />)

    return (
        <section>
            <header className="flex align-top justify-between">
                <h2>Campaign Details</h2>
                <button onClick={handleEdit}>
                    <span className="sr-only">Edit Campaign Details</span>
                    <HiPencil />
                </button>
            </header>
            <div className="border-gray-300 border-2 rounded p-2 mb-2">
                <div className="mb-1">
                    <span className="text-black uppercase font-bold text-xs">Title</span>
                </div>
                <div>
                    <span>{campaign.title}</span>
                </div>
            </div>
        </section>
    )
}

export default CampaignDetails