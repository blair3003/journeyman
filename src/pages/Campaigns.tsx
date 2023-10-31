import { Link, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Campaigns = () => {

    console.log(`Campaigns page rendered`)

    const { userId } = useParams()
    const { users, campaigns } = useAppContext()

    const user: User | undefined = users.find(user => user.id === userId)
    const myCampaigns: Campaign[] = (user?.id) ? campaigns.filter(campaign => campaign.users?.includes(user.id)) : []


    return (
        <section>
            {user && <>
                <h1>{user.displayName}'s Campaigns</h1>
                                
                <ol>
                {myCampaigns.map(campaign => (
                    <li key={campaign.id}><Link to={`/c/${campaign.id}`}>{campaign.title}</Link></li>
                ))}
                </ol>
            </>}            
        </section>
    )
}

export default Campaigns
