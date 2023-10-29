import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Campaign = () => {

    console.log(`Campaign page rendered`)

    const { campaignId } = useParams()
    const { campaigns, missions } = useAppContext()

    const campaign: Campaign | undefined = campaigns.find(campaign => campaign.id === campaignId)
    const myMissions: Mission[] = (campaign?.id) ? missions.filter(mission => mission.campaign === campaign.id) : []

    return (
        <section>
            {campaign && <>
                <h1>{campaign.title}</h1>

                <ul>
                {myMissions.map(mission => (
                    <li key={mission.id}>{mission.title}</li>
                ))}
                </ul>
            </>}            
        </section>
    )
}

export default Campaign