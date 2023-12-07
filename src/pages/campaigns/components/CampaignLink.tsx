import { Link } from 'react-router-dom'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { useLayoutContext } from '../../../context/LayoutContext'
import CampaignDetails from '../../campaign/components/CampaignDetails'
import EditCampaignDetails from '../../campaign/components/EditCampaignDetails'
import useMenu from '../../../hooks/useMenu'
import Menu from '../../../components/Menu'

interface CampaignLinkProps {
    campaign: Campaign
}

const CampaignLink = ({ campaign }: CampaignLinkProps) => {

    const { openDrawer } = useLayoutContext()
    const { menu, openMenu, closeMenu } = useMenu({
        'Campaign Details': () => openDrawer(<CampaignDetails campaign={campaign} />),
        'Edit Campaign': () => openDrawer(<EditCampaignDetails campaign={campaign} />)
    })

    return (
        <Link to={`/c/${campaign.uid}`} className="w-64 h-32 flex items-start justify-between rounded p-2 text-sm bg-blue-600 hover:bg-blue-600/75 text-white shadow-xl">
            <h3>{campaign.title}</h3>
            <div className="relative">
                <button onClick={e => {e.preventDefault(); openMenu()}}>
                    <span className="sr-only">More Campaign options</span>
                    <HiEllipsisHorizontal />
                </button>
                <Menu menu={menu} onClose={closeMenu} />
            </div>
        </Link>
    )
}

export default CampaignLink