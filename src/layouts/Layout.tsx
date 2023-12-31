import { Outlet } from 'react-router-dom'
import { LayoutProvider } from '../context/LayoutContext'
import Drawer from './Drawer'
import Error from './Error'
import Header from './Header'
import Loading from './Loading'
import Sidebar from './Sidebar'
import { useAppContext } from '../context/AppContext'

const Layout = () => {

    const { isDarkMode } = useAppContext()

    return (
		<LayoutProvider>
            <Header />
            <main className={`flex grow ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
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
