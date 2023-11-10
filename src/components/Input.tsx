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
}

const Input = ({ id, label, register, errors, type = 'text', required = false, autoComplete = '', disabled = false }: InputProps) => {

	return (
		<div className="bg-white border-gray-300 border-2 rounded p-2 mb-2">
			<div className="flex justify-between items-center mb-1">
				<label htmlFor={id} className="text-black uppercase font-bold text-xs">{label}</label>
				{errors[id] && <span className="text-red-500 uppercase font-bold text-xs">{errors[id]?.type === 'required' ? 'This field is required' : errors[id]?.message?.toString()}</span>}
			</div>
			<input
				id={id}
				type={type}
				{...register(id, { required })}
				aria-invalid={errors[id] ? "true" : "false"}
				className="w-full bg-transparent"
				autoComplete={autoComplete}
				disabled={disabled}
			/>
		</div>
	)
}

export default Input