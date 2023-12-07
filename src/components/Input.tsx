import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
	id: string
	label: string
	register: UseFormRegister<FieldValues>
	errors: FieldErrors
	type?: string
	required?: boolean
	autoComplete?: string
	disabled?: boolean
	isDarkMode?: boolean
}

const Input = ({ id, label, register, errors, type = 'text', required = false, autoComplete = '', disabled = false, isDarkMode = false }: InputProps) => {

	return (
		<div className={`p-2 mb-2 rounded ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
			<div className="flex justify-between items-center mb-1">
				<label htmlFor={id} className="grow text-sm uppercase font-bold text-slate-500">{label}</label>
				{errors[id] && <span className="text-red-500 uppercase text-sm">{errors[id]?.type === 'required' ? 'This field is required' : errors[id]?.message?.toString()}</span>}
			</div>
			<input
				id={id}
				type={type}
				{...register(id, { required })}
				aria-invalid={errors[id] ? "true" : "false"}
				className={`p-1 w-full bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 rounded ${isDarkMode ? 'text-white' : 'text-black'}`}
				autoComplete={autoComplete}
				disabled={disabled}
			/>
		</div>
	)
}

export default Input