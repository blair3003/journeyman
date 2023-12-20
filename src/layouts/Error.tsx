import Modal from '../components/Modal'
import { useDataContext } from '../context/DataContext'

const Error = () => {

    const { isError } = useDataContext()

    if (!isError) return null

    return (
        <Modal title="Error">
            <p className="font-bold text-red-500">There has been an error, please reload the app.</p>
        </Modal>
    )
}

export default Error
