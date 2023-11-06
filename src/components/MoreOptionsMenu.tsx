interface MoreOptionsMenuProps {
	handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void
	options: Record<string, () => void>
}

const MoreOptionsMenu = ({ handleClose, options }: MoreOptionsMenuProps) => {

    const handleOptionCallback = (e: React.MouseEvent<HTMLButtonElement>, callback: () => void) => {
        e.preventDefault()
        callback()
        handleClose(e)
    }
	
	return (
        <div className="absolute bg-green-500">
            <menu>
                {Object.keys(options).map(option =>
                    <li key={option}><button onClick={e => handleOptionCallback(e, options[option])}>{option}</button></li>
                )}
            </menu>
            <button onClick={handleClose} className="w-full">Close</button>
        </div>
	)
}

export default MoreOptionsMenu