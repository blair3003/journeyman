import { useLayoutContext } from '../context/LayoutContext'

const Drawer = () => {
    
    const { isDrawerOpen, toggleDrawer, drawerContent } = useLayoutContext()

    return (
        <aside data-visible={isDrawerOpen}>
            <button type="button" onClick={() => toggleDrawer()}>Close</button>
            {drawerContent}
        </aside>
    )
}

export default Drawer