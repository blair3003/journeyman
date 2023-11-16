import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface RadioProps {
	id: string
	label: string
	register: UseFormRegister<FieldValues>
  options: Record<string, any>[]
	errors: FieldErrors
	required?: boolean
	disabled?: boolean
}

const Radio = ({ id, label, register, options, errors, required = false, disabled = false }: RadioProps) => {

	return (
		<fieldset className="bg-white border-gray-300 border-2 rounded p-2 mb-2">
			<div className="flex justify-between items-center mb-1">
				<legend className="text-black uppercase font-bold text-xs">{label}</legend>
				{errors[id] && <span className="text-red-500 uppercase font-bold text-xs">{errors[id]?.type === 'required' ? 'This field is required' : errors[id]?.message?.toString()}</span>}
			</div>
			{options.map(option => (
				<div key={option.value}>
					<input
						id={option.value}
						type="radio"
						{...register(id, { required })}
						aria-invalid={errors[id] ? "true" : "false"}
						className="w-full bg-transparent"
						disabled={disabled}
					/>
					<label htmlFor={option.value}>{option.label}</label>
				</div>
			))}
		</fieldset>
	)
}

export default Radio
