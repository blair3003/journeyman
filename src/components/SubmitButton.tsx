import Loader from './Loader'

interface InputProps {
	label: string
	disabled?: boolean
}

const SubmitButton = ({ label, disabled = false }: InputProps) => {

	return (
		<button disabled={disabled} className="w-full p-4 mb-2 bg-gray-900 border-gray-300 border-2 rounded">
			{disabled ? <Loader size={16} /> : <span className="text-white uppercase font-bold text-xs">{label}</span>}				
		</button>
	)
}

export default SubmitButton