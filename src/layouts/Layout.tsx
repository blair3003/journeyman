import { LayoutProvider } from '../context/LayoutContext'
import Drawer from './Drawer'
import Error from './Error'
import Header from './Header'
import Loading from './Loading'
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
                <Loading />
                <Error />
            </main>
        </LayoutProvider>
    )

}

export default Layout
