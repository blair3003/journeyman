import { useEffect } from 'react'
import useDataReducer from './useDataReducer'
import { getCampaigns, getMissions, getObjectives, getUsers } from '../services/firestore'

interface Data {
	resources: {
        users: User[]
        campaigns: Campaign[]
        missions: Mission[]
        objectives: Objective[]
    }
    setters: {
        setUsers: (users: User[]) => void
        setCampaigns: (campaigns: Campaign[]) => void
        setMissions: (missions: Mission[]) => void
        setObjectives: (objectives: Objective[]) => void
    }
    isLoading: boolean
    isError: boolean
}

const useData = (): Data => {

    const { data, dispatchData } = useDataReducer()

    const setUsers = (users: User[]) => dispatchData({ type: 'UPDATE_USERS', payload: users })
    const setCampaigns = (campaigns: Campaign[]) => dispatchData({ type: 'UPDATE_CAMPAIGNS', payload: campaigns })
    const setMissions = (missions: Mission[]) => dispatchData({ type: 'UPDATE_MISSIONS', payload: missions })
    const setObjectives = (objectives: Objective[]) => dispatchData({ type: 'UPDATE_OBJECTIVES', payload: objectives })

	useEffect(() => {
        const getData = async () => {
            try {
                dispatchData({ type: 'DATA_FETCH_INIT' })
                const [users, campaigns, missions, objectives] = await Promise.all([
                    getUsers(),
                    getCampaigns(),
                    getMissions(),
                    getObjectives()
                ])
                dispatchData({ type: 'DATA_FETCH_SUCCESS', payload: { users, campaigns, missions, objectives } })
            } catch (error) {
                dispatchData({ type: 'DATA_FETCH_FAILURE' })
            }
        }
        getData()   
	}, [])

    return { ...data, setters: { setUsers, setCampaigns, setMissions, setObjectives } }
}

export default useData