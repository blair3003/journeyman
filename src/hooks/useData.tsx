import { useEffect } from 'react'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore'
import useDataReducer from './useDataReducer'

interface Data {
	resources: {
        users: User[]
        campaigns: Campaign[]
        missions: Mission[]
        objectives: Objective[]
    }
    isLoading: boolean
    isError: boolean
}

const useData = (): Data => {

    const { data, dispatchData } = useDataReducer()

	useEffect(() => {
        const getData = async () => {
            try {
                dispatchData({ type: 'DATA_FETCH_INIT' })
                const getUsers = async () => {
                    const data = await getDocs(collection(db, 'users'))
                    return data.docs.map(doc => ({id: doc.id, ...doc.data() }))
                }
                const getCampaigns = async () => {
                    const data = await getDocs(collection(db, 'campaigns'))
                    return data.docs.map(doc => {
                        const { users, missions, ...rest } = doc.data()
                        return {
                            id: doc.id,
                            users: users?.map((user: { id: string }) => user.id),
                            missions: missions?.map((mission: { id: string }) => mission.id),
                            ...rest
                        }
                    })
                }
                const getMissions = async () => {
                    const data = await getDocs(collection(db, 'missions'))
                    return data.docs.map(doc => {
                        const { campaign, objectives, ...rest } = doc.data()
                        return {
                            id: doc.id,
                            campaign: campaign.id,
                            objectives: objectives?.map((objective: { id: string }) => objective.id),
                            ...rest
                        }
                    })
                }
                const getObjectives = async () => {
                    const data = await getDocs(collection(db, 'objectives'))
                    return data.docs.map(doc => {
                        const { users, mission, messages, ...rest } = doc.data()
                        return {
                            id: doc.id,
                            users: users?.map((user: { id: string }) => user.id),
                            mission: mission.id,
                            messages: messages.map((message: { user: { id: string } }) => {
                                return {
                                    ...message,
                                    user: message.user.id
                                }
                            }),
                            ...rest
                        }
                    })
                }
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

    return { ...data }
}

export default useData