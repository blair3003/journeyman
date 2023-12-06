import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HiChevronDown } from 'react-icons/hi2'
import { useDataContext } from '../../context/DataContext'
import CampaignList from './components/CampaignList'
import CreateCampaignModal from './components/CreateCampaignModal'
import useMenu from '../../hooks/useMenu'
import Menu from '../../components/Menu'
import { useAppContext } from '../../context/AppContext'

const Campaigns = () => {

    const navigate = useNavigate()
    const { userId } = useParams()
    const { isDarkMode } = useAppContext()
    const { users, campaigns } = useDataContext()
    const { menu, openMenu, closeMenu } = useMenu({
        'Create Campaign': () => navigate('?createCampaign')
    })

    const user: User | undefined = users.find(user => user.uid === userId)
	const userCampaigns: Campaign[] = user ? campaigns.filter(campaign => campaign.users?.includes(user.uid)) : []

    useEffect(() => {
        if (users.length && !user) navigate('/')
    }, [user, users, navigate])

    if (!user) return null

    return (
		<section className={`grow p-4 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
            <header className="flex">
                <h1 className={`text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>{user.displayName}'s Campaigns</h1>
                <div className="relative">
                    <button onClick={openMenu} className="flex items-center">
                        <span>Add</span>
                        <HiChevronDown />                        
                    </button>
                    <Menu menu={menu} onClose={closeMenu} />
                </div>
            </header>
			<CampaignList campaigns={userCampaigns}/>
            <CreateCampaignModal userId={user.uid} />
		</section>
    )
}

export default Campaigns
