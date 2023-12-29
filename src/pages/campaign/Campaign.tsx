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
import { useAppContext } from '../../context/AppContext'

const Campaign = () => {

    const navigate = useNavigate()
    const { campaignId } = useParams()
    const { isDarkMode } = useAppContext()
    const { campaigns, missions } = useDataContext()
    const { menu, openMenu, closeMenu } = useMenu({
        'Create Mission': () => navigate('?createMission'),
        'Create Objective': () => navigate('?createObjective')
    })

    const campaign: Campaign | undefined = campaigns.find(campaign => campaign.id === campaignId)
    const campaignMissions: Mission[] = missions.filter(mission => mission.campaign === campaign?.id)

    useEffect(() => {
        if (campaigns.length && !campaign) navigate('/', { replace: true })
    }, [campaign, campaigns, navigate])

    if (!campaign) return null

    return (
        <section className={`flex flex-col overflow-hidden grow ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
            <header className="flex items-center gap-4 mb-4 p-4">
                <h1 className={`text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>{campaign.title}</h1>
                <div className="relative">
                    <button onClick={openMenu} className="flex items-center gap-1 bg-blue-800 text-white uppercase text-sm px-2 py-1 rounded">
                        <span>Add</span>
                        <HiChevronDown />                        
                    </button>
                    <Menu menu={menu} onClose={closeMenu} />
                </div>
            </header>
            <MissionList missions={campaignMissions} />
            <ObjectiveModal />
            <CreateMissionModal />
            <CreateObjectiveModal />
        </section>
    )
}

export default Campaign
