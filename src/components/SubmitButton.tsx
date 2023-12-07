import Loader from './Loader'

interface InputProps {
	label: string
	disabled?: boolean
	isDarkMode?: boolean
}

const SubmitButton = ({ label, disabled = false, isDarkMode = false }: InputProps) => {

	return (
		<button disabled={disabled} className={`w-full p-4 mb-2 rounded bg-blue-800 text-slate-300 ${isDarkMode ? '' : ''}`} >
			{disabled ? <Loader size={16} /> : <span className="uppercase text-sm">{label}</span>}				
		</button>
	)
}

export default SubmitButton