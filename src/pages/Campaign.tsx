import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HiChevronDown } from 'react-icons/hi2'
import { useAppContext } from '../context/AppContext'
import MissionList from '../components/MissionList'

const Campaign = () => {

    console.log(`Campaign page rendered`)

    const navigate = useNavigate()
    const { campaignId } = useParams()
    const { campaigns, missions } = useAppContext()

    const campaign: Campaign | undefined = campaigns.find(campaign => campaign.id === campaignId)
    const myMissions: Mission[] = missions.filter(mission => mission.campaign === campaign?.id)

    // TODO: CampaignAddMenu
    const handleCampaignAddMenu = () => {
        console.log('CampaignAddMenu open')
    }

    useEffect(() => {
        if (campaigns.length && !campaign) navigate('/')
    }, [campaign, campaigns, navigate])

    return (
        <section>
            <header className="flex">
                <h1>{campaign?.title}</h1>
                <button onClick={handleCampaignAddMenu} className="flex items-center">
                    <span>Add</span>
                    <HiChevronDown />                        
                </button>
            </header>
            <MissionList missions={myMissions} />       
        </section>
    )
}

export default Campaign