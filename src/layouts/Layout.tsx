import { Outlet } from 'react-router-dom'
import { LayoutProvider } from '../context/LayoutContext'
import Drawer from './Drawer'
import Error from './Error'
import Header from './Header'
import Loading from './Loading'
import Sidebar from './Sidebar'

const Layout = () => {

    return (
		<LayoutProvider>
            <Header />
            <main className="flex grow">
                <Sidebar />
                <Outlet />
                <Drawer />
                <Loading />
                <Error />
            </main>
        </LayoutProvider>
    )

}

export default Layout
