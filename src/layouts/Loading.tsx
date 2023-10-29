import { useAppContext } from '../context/AppContext'

const Loading = () => {

    console.log(`Loading rendered`)

    const { isLoading } = useAppContext()

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
