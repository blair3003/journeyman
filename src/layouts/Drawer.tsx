import { useLayoutContext } from '../context/LayoutContext'

const Drawer = () => {

    console.log(`Drawer rendered`)
    
    const { drawer, closeDrawer } = useLayoutContext()

    return (
        {drawer &&
        <aside>
            <button type="button" onClick={() => closeDrawer()}>Close</button>
            {drawer}
        </aside>}
    )
}

export default Drawer
