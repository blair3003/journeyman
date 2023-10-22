import { useLayoutContext } from '../context/LayoutContext'

const Drawer = () => {

    const { drawerContent } = useLayoutContext()

    return (
        <aside>{drawerContent}</aside>
    )
}

export default Drawer