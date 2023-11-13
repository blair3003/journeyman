import { Link } from 'react-router-dom'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { useLayoutContext } from '../context/LayoutContext'
import CampaignDetails from './CampaignDetails'
import EditCampaignDetails from './EditCampaignDetails'
import useMoreOptionsMenu from '../hooks/useMoreOptionsMenu'
import MoreOptionsMenu from './MoreOptionsMenu'

interface CampaignLinkProps {
    campaign: Campaign
}

const CampaignLink = ({ campaign }: CampaignLinkProps) => {

    const { openDrawer } = useLayoutContext()
    const { menu, openMenu, closeMenu } = useMoreOptionsMenu({
        'Campaign Details': () => openDrawer(<CampaignDetails campaign={campaign} />),
        'Edit Campaign': () => openDrawer(<EditCampaignDetails campaign={campaign} />)
    })

    return (
        <Link to={`/c/${campaign.uid}`} className="flex bg-red-500 w-64">
            <h3>{campaign.title}</h3>
            <div className="relative">
                <button onClick={e => {e.preventDefault(); openMenu()}}>
                    <span className="sr-only">More Campaign options</span>
                    <HiEllipsisHorizontal />
                </button>
                <MoreOptionsMenu menu={menu} onClose={closeMenu} />
            </div>
        </Link>
    )
}

export default CampaignLink