import { useAppContext } from '../context/AppContext'

const Error = () => {

    console.log(`Error rendered`)

    const { isError } = useAppContext()

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
