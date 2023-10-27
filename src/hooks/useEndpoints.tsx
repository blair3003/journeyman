interface Endpoints {
	getCampaignsUrl: () => string
}

const useEndpoints = (): Endpoints => {

    console.log(`useEndpoints rendered`)

	// const baseUrl = ''
	// const getCampaignsUrl = () => `${baseUrl}/campaigns`
    const getCampaignsUrl = () => '/data/campaigns.json'

	return {
		getCampaignsUrl
	}
}

export default useEndpoints