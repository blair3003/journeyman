import { renderHook, act } from '@testing-library/react'
import useDrawer from './useDrawer'

const TestComponent = () => <>test</>

describe('useDrawer', () => {	

	it('should start empty', () => {
        const { result } = renderHook(() => useDrawer())
        expect(result.current.drawer).toBeNull()
    })

    it('should set drawer to the test component', () => {
        const { result } = renderHook(() => useDrawer())
        act(() => {
            result.current.openDrawer(<TestComponent />)
        })
        expect(result.current.drawer).toStrictEqual(<TestComponent />)
    })

    it('should clear the drawer', () => {
        const { result } = renderHook(() => useDrawer())
        act(() => {
            result.current.openDrawer(<TestComponent />)
        })
        act(() => {
            result.current.closeDrawer()
        })
        expect(result.current.drawer).toBeNull()
    })

})
