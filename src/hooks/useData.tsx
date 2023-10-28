import { useCallback, useEffect } from 'react'
import useEndpoints from './useEndpoints'
import useDataReducer from './useDataReducer'

interface Data {
	resources: {
        campaigns: Campaign[]
        missions: Mission[]
        objectives: Objective[]
    }
    isLoading: boolean
    isError: boolean
}

const useData = (): Data => {

    console.log(`useData rendered`)

    const { data, dispatchData } = useDataReducer()
    const { campaignsUrl, missionsUrl, objectivesUrl } = useEndpoints()

    const handleFetchData = useCallback(() => {
		const controller = new AbortController();
	    (async () => {
			try {
                dispatchData({ type: 'DATA_FETCH_INIT' })
                const fetchPromise = async (url: string) => {
                    const response = await fetch(url, { signal: controller.signal })
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
                    console.log(`Fetched ${url}`)
                    return response.json()
                }
                const [campaigns, missions, objectives]: [Campaign[], Mission[], Objective[]] = await Promise.all([
                    fetchPromise(campaignsUrl),
                    fetchPromise(missionsUrl),
                    fetchPromise(objectivesUrl)
                ])
                dispatchData({ type: 'DATA_FETCH_SUCCESS', payload: { campaigns, missions, objectives } })              
			} catch (err: any) {
                if (err.name !== 'AbortError') dispatchData({ type: 'DATA_FETCH_FAILURE' })
			}
	    })()
	    return controller  
	}, [campaignsUrl, missionsUrl, objectivesUrl])

	useEffect(() => {
        const fetchData = handleFetchData()
		return () => fetchData.abort()        
	}, [handleFetchData])

    return { ...data }
}

export default useData