import LayoutProvider from '../context/LayoutContext'
import Drawer from './Drawer'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {

    console.log(`Layout rendered`)

    return (
		<LayoutProvider>
            <Header />
            <main>
                <Sidebar />
                <Outlet />
                <Drawer />
            </main>
        </LayoutProvider>
    )

}

export default Layout