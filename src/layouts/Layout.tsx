import Drawer from './Drawer'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <Header />
            <main>
                <Sidebar />
                {children}
                <Drawer />
            </main>
        </>
    )

}

export default Layout