import { useReducer } from 'react'

interface DataReducer {
    data: Data
    dispatchData: React.Dispatch<DataAction>
}

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

interface DataAction {
    type: string
    payload?: any
}

enum DataActionTypes {
    DATA_FETCH_INIT = 'DATA_FETCH_INIT',
    DATA_FETCH_SUCCESS = 'DATA_FETCH_SUCCESS',
    DATA_FETCH_FAILURE = 'DATA_FETCH_FAILURE',
    UPDATE_USERS = 'UPDATE_USERS',
    UPDATE_CAMPAIGNS = 'UPDATE_CAMPAIGNS',
    UPDATE_MISSIONS = 'UPDATE_MISSIONS',
    UPDATE_OBJECTIVES = 'UPDATE_OBJECTIVES'
}

const useDataReducer = (): DataReducer => {
    
    const dataReducer = (state: Data, action: DataAction): Data => {
        switch (action.type) {
            case DataActionTypes.DATA_FETCH_INIT:
                return { ...state, isLoading: true, isError: false }
            case DataActionTypes.DATA_FETCH_SUCCESS:
                console.log(`Data loaded`)
                return { ...state, resources: action.payload, isLoading: false, isError: false }
            case DataActionTypes.DATA_FETCH_FAILURE:
                return { ...state, isLoading: false, isError: true }
            case DataActionTypes.UPDATE_USERS:
                return { ...state, resources: { ...state.resources, users: action.payload } }
            case DataActionTypes.UPDATE_CAMPAIGNS:
                return { ...state, resources: { ...state.resources, campaigns: action.payload } }
            case DataActionTypes.UPDATE_MISSIONS:
                return { ...state, resources: { ...state.resources, missions: action.payload } }
            case DataActionTypes.UPDATE_OBJECTIVES:
                return { ...state, resources: { ...state.resources, objectives: action.payload } }
            default:
                return { ...state }
        }
    }
    
    const dataInitial: Data = {
        resources: {
            users: [],
            campaigns: [],
            missions: [],
            objectives: []
        },
        isLoading: false,
        isError: false
    }

    const [data, dispatchData] = useReducer(dataReducer, dataInitial)

    return {
        data,
        dispatchData
    }
}

export default useDataReducer