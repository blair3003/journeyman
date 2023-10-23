import { useLayoutContext } from '../context/LayoutContext'

const Drawer = () => {

    console.log(`Drawer rendered`)
    
    const { drawer, closeDrawer } = useLayoutContext()

    return (
        <aside data-visible={drawer.open}>
            <button type="button" onClick={() => closeDrawer()}>Close</button>
            {drawer.content}
        </aside>
    )
}

export default Drawer