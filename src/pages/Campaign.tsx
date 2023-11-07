import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HiChevronDown } from 'react-icons/hi2'
import { useDataContext } from '../context/DataContext'
import MissionList from '../components/MissionList'
import ObjectiveModal from '../components/ObjectiveModal'

const Campaign = () => {

    const navigate = useNavigate()
    const { campaignId } = useParams()
    const { campaigns, missions, objectives } = useDataContext()

    const campaign: Campaign | undefined = campaigns.find(campaign => campaign.uid === campaignId)
    const userMissions: Mission[] = missions.filter(mission => mission.campaign === campaign?.uid)
    const userObjectives: Objective[] = objectives.filter(objective => userMissions.some(mission => mission.uid === objective.mission))

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
            <MissionList missions={userMissions} />
            <ObjectiveModal objectives={userObjectives}/>        
        </section>
    )
}

export default Campaign