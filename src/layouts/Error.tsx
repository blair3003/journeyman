import { useDataContext } from '../context/DataContext'

const Error = () => {

    const { isError } = useDataContext()

    return (
        <>
        {isError && 
            <div className="absolute">
                Error!
            </div>
        }
        </>
    )
}

export default Error
