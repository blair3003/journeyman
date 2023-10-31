import { renderHook } from '@testing-library/react'
import useEndpoints from './useEndpoints'

const keys = ['usersUrl', 'campaignsUrl', 'missionsUrl', 'objectivesUrl']

describe('useEndpoints', () => {

	it('should contain the required keys', () => {
        const { result } = renderHook(() => useEndpoints())
        keys.forEach(key => expect(result.current).toHaveProperty(key))
    })

})
