import Loader from '../components/Loader'
import { useDataContext } from '../context/DataContext'

const Loading = () => {

    const { isLoading } = useDataContext()

    if (!isLoading) return null

    return (
        <div className="absolute inset-0 grid place-content-center">
            <Loader color="#1e40af" />
        </div>
    )
}

export default Loading
