import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface SelectProps {
	id: string
	label: string
	register: UseFormRegister<FieldValues>
    options: Record<string, any>[]
	defaultOptionLabel: string
	errors: FieldErrors
	required?: boolean
	disabled?: boolean
}

const Select = ({ id, label, register, options, defaultOptionLabel, errors, required = false, disabled = false }: SelectProps) => {

	return (
		<div className="bg-white border-gray-300 border-2 rounded p-2 mb-2">
			<div className="flex justify-between items-center mb-1">
				<label htmlFor={id} className="text-black uppercase font-bold text-xs">{label}</label>
				{errors[id] && <span className="text-red-500 uppercase font-bold text-xs">{errors[id]?.type === 'required' ? 'This field is required' : errors[id]?.message?.toString()}</span>}
			</div>
			<select
				id={id}
				{...register(id, { required })}
				aria-invalid={errors[id] ? "true" : "false"}
				className="w-full bg-transparent"
				disabled={disabled}
			>
                <option value="">{defaultOptionLabel}</option>
				{options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
		</div>
	)
}

export default Select
