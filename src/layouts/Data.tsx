import { Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { DataProvider } from '../context/DataContext'

const Data = () => {

    const auth = useAuthContext()
    if (!auth) return null

    return (
		<DataProvider>
            <Outlet />
        </DataProvider>
    )

}

export default Data
