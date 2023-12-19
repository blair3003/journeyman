import CampaignLink from './CampaignLink'

interface CampaignListProps {
    campaigns: Campaign[]
}

const CampaignList = ({ campaigns }: CampaignListProps) => {

    return (
        <section>
            <h2 className="sr-only">Campaign List</h2>
            <ol className="flex gap-4">
                {campaigns.map(campaign => <li key={campaign.id}><CampaignLink campaign={campaign}/></li>)}
            </ol>
        </section>
    )
}

export default CampaignList