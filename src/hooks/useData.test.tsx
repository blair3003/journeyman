import { renderHook } from '@testing-library/react'
import useData from './useData'

describe('useData', () => {

	it('should retrieve the required data without error', () => {
        const { result } = renderHook(() => useData())
        expect(result.current).toHaveProperty('resources')
        expect(result.current.resources).toHaveProperty('users')
        expect(result.current.resources).toHaveProperty('campaigns')
        expect(result.current.resources).toHaveProperty('missions')
        expect(result.current).toHaveProperty('isLoading')
        expect(result.current).toHaveProperty('isError', false)
    })

})