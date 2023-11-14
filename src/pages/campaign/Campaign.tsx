import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HiChevronDown } from 'react-icons/hi2'
import { useDataContext } from '../../context/DataContext'
import Menu from '../../components/Menu'
import useMenu from '../../hooks/useMenu'
import CreateMissionModal from './components/CreateMissionModal'
import CreateObjectiveModal from './components/CreateObjectiveModal'
import MissionList from './components/MissionList'
import ObjectiveModal from './components/ObjectiveModal'

const Campaign = () => {

    const navigate = useNavigate()
    const { campaignId } = useParams()
    const { campaigns, missions, objectives } = useDataContext()
    const { menu, openMenu, closeMenu } = useMenu({
        'Create Mission': () => navigate('?createMission'),
        'Create Objective': () => navigate('?createObjective')
    })

    const campaign: Campaign | undefined = campaigns.find(campaign => campaign.uid === campaignId)
    const campaignMissions: Mission[] = missions.filter(mission => mission.campaign === campaign?.uid)
    const missionObjectives: Objective[] = objectives.filter(objective => campaignMissions.some(mission => mission.uid === objective.mission))

    useEffect(() => {
        if (campaigns.length && !campaign) navigate('/')
    }, [campaign, campaigns, navigate])

    if (!campaign) return null

    return (
        <section>
            <header className="flex">
                <h1>{campaign.title}</h1>
                <div className="relative">
                    <button onClick={openMenu} className="flex items-center">
                        <span>Add</span>
                        <HiChevronDown />                        
                    </button>
                    <Menu menu={menu} onClose={closeMenu} />
                </div>
            </header>
            <MissionList missions={campaignMissions} />
            <ObjectiveModal objectives={missionObjectives}/>
            <CreateMissionModal campaignId={campaign.uid}/>
            <CreateObjectiveModal missions={campaignMissions}/>
        </section>
    )
}

export default Campaign
