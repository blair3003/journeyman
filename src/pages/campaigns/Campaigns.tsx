import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HiChevronDown } from 'react-icons/hi2'
import { useDataContext } from '../../context/DataContext'
import CampaignList from './components/CampaignList'
import CreateCampaignModal from './components/CreateCampaignModal'
import useMenu from '../../hooks/useMenu'
import Menu from '../../components/Menu'
import { useAppContext } from '../../context/AppContext'
import { useAuthContext } from '../../context/AuthContext'

const Campaigns = () => {

    const navigate = useNavigate()
    const { userId } = useParams()
    const { isDarkMode } = useAppContext()
    const { authUser } = useAuthContext()
    const { users, campaigns } = useDataContext()
    const { menu, openMenu, closeMenu } = useMenu({
        'Create Campaign': () => navigate('?createCampaign')
    })

    const user: User | undefined = users.find(user => user.id === userId)
	const userCampaigns: Campaign[] = user ? campaigns.filter(campaign => campaign.users?.includes(user.id)) : []
    const isAuth = user?.uid === authUser?.uid

    useEffect(() => {
        if (users.length && !user) navigate('/', { replace: true })
    }, [user, users, navigate])

    if (!user) return null

    return (
		<section className={`grow ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
            <header className="flex items-start gap-4 mb-4 p-4">
                <h1 className={`text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>{user.displayName}'s Campaigns</h1>
                {isAuth && <div className="relative">
                    <button onClick={openMenu} className="mt-1 flex items-center gap-1 bg-blue-800 text-white uppercase text-sm px-2 py-1 rounded">
                        <span>Add</span>
                        <HiChevronDown />                        
                    </button>
                    <Menu menu={menu} onClose={closeMenu} />
                </div>}
            </header>
			<CampaignList campaigns={userCampaigns}/>
            <CreateCampaignModal />
		</section>
    )
}

export default Campaigns
