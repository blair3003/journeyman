import CampaignLink from './CampaignLink'

interface CampaignListProps {
    campaigns: Campaign[]
}

const CampaignList = ({ campaigns }: CampaignListProps) => {

    return (
        <section>
            <h2 className="sr-only">Campaign List</h2>
            <ol>
                {campaigns.map(campaign => <li key={campaign.uid}><CampaignLink campaign={campaign}/></li>)}
            </ol>
        </section>
    )
}

export default CampaignList