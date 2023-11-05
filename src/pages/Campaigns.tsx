import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDataContext } from '../context/DataContext'
import { useAuthContext } from '../context/AuthContext'

const Campaigns = () => {

    const navigate = useNavigate()
    const { userId } = useParams()
    const { users, campaigns } = useDataContext()
    const { auth } = useAuthContext()

    const user: User | undefined = users.find(user => user.id === userId)
    const myCampaigns: Campaign[] = (user) ? campaigns.filter(campaign => campaign.users?.includes(user.id)) : []

    useEffect(() => {
        // if (users.length && !user) navigate('/')
    }, [user, users, navigate])

    return (
        <section>
            {auth && <>
                <h1>{auth.displayName}'s Campaigns</h1>
                                
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
