import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface TextareaProps {
	id: string
	label: string
	register: UseFormRegister<FieldValues>
	errors: FieldErrors
	required?: boolean
	rows?: number
	disabled?: boolean
	isDarkMode?: boolean
}

const Textarea = ({ id, label, register, errors, required = false, rows = 3, disabled = false, isDarkMode = false }: TextareaProps) => {

	return (
		<div className={`p-2 mb-2 rounded ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
			<div className="flex justify-between items-center">
				<label htmlFor={id} className="grow text-sm uppercase font-bold text-slate-500 cursor-pointer pb-1">{label}</label>
				{errors[id] && <span className="text-red-500 uppercase font-bold text-sm">{errors[id]?.type === 'required' ? 'This field is required' : errors[id]?.message?.toString()}</span>}
			</div>
			<textarea
				id={id}
				{...register(id, { required })}
				aria-invalid={errors[id] ? "true" : "false"}
				style={{ colorScheme: isDarkMode ? 'dark' : 'normal' }}
				className={`p-1 w-full bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 rounded cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'}`}
				rows={rows}
				disabled={disabled}
			></textarea>
		</div>
	)
}

export default Textarea