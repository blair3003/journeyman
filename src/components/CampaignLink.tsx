import { Link } from 'react-router-dom'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { useLayoutContext } from '../context/LayoutContext'
import CampaignDetails from './CampaignDetails'
import EditCampaign from './EditCampaign'
import useMoreOptionsMenu from '../hooks/useMoreOptionsMenu'

interface CampaignLinkProps {
    campaign: Campaign
}

const CampaignLink = ({ campaign }: CampaignLinkProps) => {

    const { openDrawer } = useLayoutContext()
    const { menu, openMenu } = useMoreOptionsMenu({
        'Campaign Details': () => openDrawer(<CampaignDetails campaign={campaign} />),
        'Edit Campaign': () => openDrawer(<EditCampaign campaign={campaign} />)
    })

    return (
        <Link to={`/c/${campaign.uid}`} className="flex bg-red-500 w-64">
            <h3>{campaign.title}</h3>
            <div className="relative">
                <button onClick={openMenu}>
                    <span className="sr-only">More Campaign options</span>
                    <HiEllipsisHorizontal />
                </button>
                {menu}
            </div>
        </Link>
    )
}

export default CampaignLink