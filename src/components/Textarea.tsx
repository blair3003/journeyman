import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface TextareaProps {
	id: string
	label: string
	register: UseFormRegister<FieldValues>
	errors: FieldErrors
	required?: boolean
	rows?: number
	disabled?: boolean
}

const Textarea = ({ id, label, register, errors, required = false, rows = 3, disabled = false }: TextareaProps) => {

	return (
		<div className="bg-white border-gray-300 border-2 rounded p-2 mb-2">
			<div className="flex justify-between items-center mb-1">
				<label htmlFor={id} className="text-black uppercase font-bold text-xs">{label}</label>
				{errors[id] && <span className="text-red-500 uppercase font-bold text-xs">{errors[id]?.type === 'required' ? 'This field is required' : errors[id]?.message?.toString()}</span>}
			</div>
			<textarea
				id={id}
				{...register(id, { required })}
				aria-invalid={errors[id] ? "true" : "false"}
				className="w-full bg-transparent"
				rows={rows}
				disabled={disabled}
			></textarea>
		</div>
	)
}

export default Textarea