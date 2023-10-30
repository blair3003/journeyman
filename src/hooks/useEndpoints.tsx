interface Endpoints {
	usersUrl: string
	campaignsUrl: string
	missionsUrl: string
	objectivesUrl: string
}

const useEndpoints = (): Endpoints => {

    console.log(`useEndpoints rendered`)

	return {
		usersUrl: '/data/users.json',
		campaignsUrl: '/data/campaigns.json',
		missionsUrl: '/data/missions.json',
		objectivesUrl: '/data/objectives.json'
	}
}

export default useEndpoints