import { useCallback, useEffect, useState } from 'react'
import useEndpoints from '../hooks/useEndpoints'

interface Campaigns {
	campaigns: Campaign[]
}

const useCampaigns = (): Campaigns => {

    console.log(`useCampaigns rendered`)

	const [campaigns, setCampaigns] = useState<Campaign[]>([])
	const { getCampaignsUrl } = useEndpoints()

	const handleFetchCampaigns = useCallback(() => {
		const controller = new AbortController();
	    (async () => {
			try {
				const response = await fetch(getCampaignsUrl(), { signal: controller.signal })
				const data = await response.json()
				setCampaigns(data)
			} catch (err) {
				// console.log(err)
			}
	    })()
	    return controller  
	}, [])

	useEffect(() => {
        const fetchCampaigns = handleFetchCampaigns()
		return () => fetchCampaigns.abort()
	}, [])

	return {
		campaigns
	}
}

export default useCampaigns