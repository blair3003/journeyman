import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDataContext } from '../context/DataContext'
import CampaignList from '../components/CampaignList'

const Campaigns = () => {

    const navigate = useNavigate()
    const { userId } = useParams()
    const { users, campaigns } = useDataContext()

    const user: User | undefined = users.find(user => user.uid === userId)
	const userCampaigns: Campaign[] = user ? campaigns.filter(campaign => campaign.users?.includes(user.uid)) : []

    useEffect(() => {
        if (users.length && !user) navigate('/')
    }, [user, users, navigate])

    if (!user) return null

    return (
		<section>
			<h1>{user.displayName}'s Campaigns</h1>
			<CampaignList campaigns={userCampaigns}/>
		</section>
    )
}

export default Campaigns
