import LayoutProvider from '../context/LayoutContext'
import Drawer from './Drawer'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
		<LayoutProvider>
            <Header />
            <main>
                <Sidebar />
                {children}
                <Drawer />
            </main>
        </LayoutProvider>
    )

}

export default Layout