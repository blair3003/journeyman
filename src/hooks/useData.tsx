import { useCallback, useEffect, useState } from 'react'
import useEndpoints from './useEndpoints'

interface Data {
	campaigns: Campaign[]
    missions: Mission[]
    objectives: Objective[]
    isLoading: boolean
    isError: boolean
}

const useData = (): Data => {

    console.log(`useData rendered`)

    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [missions, setMissions] = useState<Mission[]>([])
    const [objectives, setObjectives] = useState<Objective[]>([])

    const [isLoading, setIsLoading] = useState(false) 
    const [isError, setIsError] = useState(false) 

    const { campaignsUrl, missionsUrl, objectivesUrl } = useEndpoints()

    const handleFetchData = useCallback(() => {
		const controller = new AbortController();
	    (async () => {
			try {
                setIsLoading(true)
                const fetchPromise = async (url: string) => {
                    const response = await fetch(url, { signal: controller.signal })
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
                    console.log(`Fetched ${url}`)
                    return response.json()
                }
                const [campaignsData, missionsData, objectivesData] = await Promise.all([
                    fetchPromise(campaignsUrl),
                    fetchPromise(missionsUrl),
                    fetchPromise(objectivesUrl)
                ])
				setCampaigns(campaignsData)
				setMissions(missionsData)
				setObjectives(objectivesData)
                setIsError(false)
			} catch (err) {
                setIsError(true)
			} finally {
                setIsLoading(false)
            }
	    })()
	    return controller  
	}, [campaignsUrl, missionsUrl, objectivesUrl])

	useEffect(() => {
        const fetchData = handleFetchData()
		return () => fetchData.abort()
        
	}, [handleFetchData])

    return {
        campaigns,
        missions,
        objectives,
        isLoading,
        isError
    }
}

export default useData