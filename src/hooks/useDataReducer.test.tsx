import { renderHook, act } from '@testing-library/react'
import useDataReducer from './useDataReducer'

const testResources = {
    users: ["user1", "user2", "user3"],
    campaigns: ["campaign1", "campaign2", "campaign3"],
    missions: ["mission1", "mission2", "mission3"],
    objectives: ["objective1", "objective2", "objective3"]
}

describe('useDataReducer', () => {

	it('should contain the required resources', () => {
        const { result } = renderHook(() => useDataReducer())
        expect(result.current).toHaveProperty('data')
        expect(result.current.data).toHaveProperty('resources')
        Object.keys(testResources).forEach(key => expect(result.current.data.resources).toHaveProperty(key))
    })

	it('should contain the expected data', () => {
        const { result } = renderHook(() => useDataReducer())
        act(() => {
            result.current.dispatchData({ type: 'DATA_FETCH_SUCCESS', payload: testResources })
        })
        expect(result.current.data).toStrictEqual({ resources: testResources, isLoading: false, isError: false })
    })

	it('should have loading true and error false', () => {
        const { result } = renderHook(() => useDataReducer())
        act(() => {
            result.current.dispatchData({ type: 'DATA_FETCH_INIT' })
        })
        expect(result.current.data).toHaveProperty('isLoading', true)
        expect(result.current.data).toHaveProperty('isError', false)
    })

	it('should have loading true and error false', () => {
        const { result } = renderHook(() => useDataReducer())
        act(() => {
            result.current.dispatchData({ type: 'DATA_FETCH_FAILURE' })
        })
        expect(result.current.data).toHaveProperty('isLoading', false)
        expect(result.current.data).toHaveProperty('isError', true)
    })

	it('should not change the state', () => {
        const { result } = renderHook(() => useDataReducer())
        const data = { ...result.current.data }
        act(() => {
            result.current.dispatchData({ type: 'NON_EXISTANT_ACTION' })
        })
        expect(result.current.data).toStrictEqual(data)
    })

})