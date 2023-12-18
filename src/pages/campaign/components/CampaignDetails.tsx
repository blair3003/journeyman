import { HiPencil } from 'react-icons/hi2'
import { useLayoutContext } from '../../../context/LayoutContext'
import EditCampaignDetails from './EditCampaignDetails'
import { useAppContext } from '../../../context/AppContext'

interface CampaignDetailsProps {
    campaign: Campaign
}

const CampaignDetails = ({ campaign }: CampaignDetailsProps) => {

    const { isDarkMode } = useAppContext()
    const { openDrawer } = useLayoutContext()

    const handleEdit = () => openDrawer(<EditCampaignDetails campaign={campaign} />)

    return (
        <section className="p-4">
            <header className="flex align-top justify-between">
                <h2 className="uppercase text-sm font-bold p-2 text-slate-500">Campaign Details</h2>
                <button
                    onClick={handleEdit}
                    className={`p-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
                >
                    <span className="sr-only">Edit Campaign Details</span>
                    <HiPencil />
                </button>
            </header>
            <button 
                onClick={handleEdit}
                className={`w-full text-left p-2 mb-2 rounded ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}
            >
                <div className="text-sm uppercase font-bold text-slate-500 pb-1">Title</div>
                <div className={`p-1 w-full rounded ${isDarkMode ? 'text-white' : 'text-black'}`}>{campaign.title}</div>
            </button>
        </section>
    )
}

export default CampaignDetails