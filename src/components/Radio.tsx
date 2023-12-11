import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface RadioProps {
	id: string
	label: string
	register: UseFormRegister<FieldValues>
	options: Record<string, string>[]
	errors: FieldErrors
	required?: boolean
	disabled?: boolean
	isDarkMode?: boolean
}

const Radio = ({ id, label, register, options, errors, required = false, disabled = false, isDarkMode = false }: RadioProps) => {

	return (
		<div className={`p-2 mb-2 rounded ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
			<div className="flex justify-between items-center">
				<span className="grow text-sm uppercase font-bold text-slate-500 cursor-default pb-1">{label}</span>
				{errors[id] && <span className="text-red-500 uppercase font-bold text-sm">{errors[id]?.type === 'required' ? 'This field is required' : errors[id]?.message?.toString()}</span>}
			</div>
			<div className="flex items-center justify-start gap-12 p-2">
				{options.map(option => (
					<div key={option.value} className="flex items-center justify-start">
						<input
							id={option.value}
							type="radio"
							value={option.value}
							{...register(id, { required })}
							aria-invalid={errors[id] ? "true" : "false"}
							style={{ colorScheme: isDarkMode ? 'dark' : 'normal' }}
							className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 cursor-pointer"
							disabled={disabled}
						/>
						<label htmlFor={option.value} className={`pl-2 cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'}`}>{option.label}</label>
					</div>
				))}
			</div>
		</div>
	)
}

export default Radio
