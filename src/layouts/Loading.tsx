import { useDataContext } from '../context/DataContext'

const Loading = () => {

    const { isLoading } = useDataContext()

    return (
        <>
        {isLoading && 
            <div className="absolute">
                Loading...
            </div>
        }
        </>
    )
}

export default Loading
