import CampaignLink from './CampaignLink'

interface CampaignListProps {
    campaigns: Campaign[]
}

const CampaignList = ({ campaigns }: CampaignListProps) => {

    return (
        <section className="p-4">
            <h2 className="sr-only">Campaign List</h2>
            <ol className="flex gap-4 flex-wrap">
                {campaigns.map(campaign => <li key={campaign.id} className="basis-full sm:basis-1/4 aspect-[2/1]"><CampaignLink campaign={campaign}/></li>)}
            </ol>
        </section>
    )
}

export default CampaignList