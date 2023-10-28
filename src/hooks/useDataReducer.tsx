import { useReducer } from 'react'

interface DataReducer {
    data: Data
    dispatchData: React.Dispatch<DataAction>
}

interface Data {
	resources: {
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
    DATA_FETCH_FAILURE = 'DATA_FETCH_FAILURE'
}

const useDataReducer = (): DataReducer => {
    
    console.log(`useDataReducer rendered`)
    
    const dataReducer = (state: Data, action: DataAction): Data => {
        switch (action.type) {
            case DataActionTypes.DATA_FETCH_INIT:
                return { ...state, isLoading: true, isError: false }
            case DataActionTypes.DATA_FETCH_SUCCESS:
                return { ...state, resources: action.payload, isLoading: false, isError: false }
            case DataActionTypes.DATA_FETCH_FAILURE:
                return { ...state, isLoading: false, isError: true }
            default:
                return { ...state, isLoading: false, isError: false }
        }
    }
    
    const dataInitial: Data = {
        resources: {
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