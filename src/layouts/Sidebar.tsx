import { Link, useParams } from 'react-router-dom'
import { HiMiniArrowRightOnRectangle } from 'react-icons/hi2'
import { useAppContext } from '../context/AppContext'
import { useDataContext } from '../context/DataContext'
import { useAuthContext } from '../context/AuthContext'

const Sidebar = () => {

    const { campaignId } = useParams()
    const { isDarkMode } = useAppContext()
    const { auth } = useAuthContext()
    const { campaigns } = useDataContext()

	const userCampaigns: Campaign[] = auth ? campaigns.filter(campaign => campaign.users?.includes(auth.uid)) : []

    return (
        <aside className={`p-2 w-64 flex flex-col ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
            <h2 className="sr-only">Navigation</h2>

            <section className="grow">
                <h3 className="uppercase text-sm font-bold p-2 text-slate-500">
                    <Link to={`/u/${auth?.uid}/campaigns`} className="block">My Campaigns</Link>
                </h3>
                <nav>
                    <ol>
                        {userCampaigns.map(campaign => (
                            <li key={campaign.uid}>
                                <Link
                                    to={`/c/${campaign.uid}`}
                                    title={campaign.title}
                                    className={`block px-2 py-1 rounded text-sm truncate ${isDarkMode ? 'text-slate-300' : 'text-black'} ${campaign.uid === campaignId ? isDarkMode ? 'bg-blue-900' : 'bg-slate-100' : '' }`}
                                >{campaign.title}</Link>
                            </li>
                        ))}
                    </ol>
                </nav>
            </section>

            <section>
                <h3 className="uppercase text-sm font-bold p-2 text-slate-500">
                    <Link to="/logout" className="flex items-center gap-1">Log out <HiMiniArrowRightOnRectangle /></Link>
                </h3>
            </section>
        </aside>
    )
}

export default Sidebar