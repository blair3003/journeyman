import { useCallback, useEffect, useState } from 'react'

interface Data {
	campaigns: Campaign[]
    missions: Mission[]
    objectives: Objective[]
}

const useData = (): Data => {

    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [missions, setMissions] = useState<Mission[]>([])
    const [objectives, setObjectives] = useState<Objective[]>([])

    const handleFetchData = useCallback(() => {
		const controller = new AbortController();
	    (async () => {
			try {
                const fetchPromise = async (url: string) => {
                    const response = await fetch(url, { signal: controller.signal })
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
                    console.log(`Fetched ${url}`)
                    return response.json()
                }
                const [campaignsData, missionsData, objectivesData] = await Promise.all([
                    fetchPromise('/data/campaigns.json'),
                    fetchPromise('/data/missions.json'),
                    fetchPromise('/data/objectives.json')
                ])
				setCampaigns(campaignsData)
				setMissions(missionsData)
				setObjectives(objectivesData)
			} catch (err) {
				// console.log(err)
			}
	    })()
	    return controller  
	}, [])

	useEffect(() => {
        const fetchData = handleFetchData()
		return () => fetchData.abort()
	}, [])

    return {
        campaigns,
        missions,
        objectives
    }
}

export default useData