interface Endpoints {
	campaignsUrl: string
	missionsUrl: string
	objectivesUrl: string
}

const useEndpoints = (): Endpoints => {

    console.log(`useEndpoints rendered`)

	return {
		campaignsUrl: '/data/campaigns.json',
		missionsUrl: '/data/missions.json',
		objectivesUrl: '/data/objectives.json',
	}
}

export default useEndpoints