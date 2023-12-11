import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface SelectProps {
	id: string
	label: string
	register: UseFormRegister<FieldValues>
    options: Record<string, string>[]
	defaultOptionLabel: string
	errors: FieldErrors
	required?: boolean
	disabled?: boolean
	isDarkMode?: boolean
}

const Select = ({ id, label, register, options, defaultOptionLabel, errors, required = false, disabled = false, isDarkMode = false }: SelectProps) => {

	return (
		<div className={`p-2 mb-2 rounded ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
			<div className="flex justify-between items-center">
				<label htmlFor={id} className="grow text-sm uppercase font-bold text-slate-500 cursor-pointer pb-1">{label}</label>
				{errors[id] && <span className="text-red-500 uppercase font-bold text-sm">{errors[id]?.type === 'required' ? 'This field is required' : errors[id]?.message?.toString()}</span>}
			</div>
			<select
				id={id}
				{...register(id, { required })}
				aria-invalid={errors[id] ? "true" : "false"}
				style={{ colorScheme: isDarkMode ? 'dark' : 'normal' }}
				className={`p-1 w-full bg-transparent cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 rounded ${isDarkMode ? 'text-white' : 'text-black'}`}
				disabled={disabled}
			>
                <option value="" className={`${isDarkMode ? 'text-white bg-slate-950' : 'bg-slate-50 text-black'}`}>{defaultOptionLabel}</option>
				{options.map(option => <option key={option.value} value={option.value} className={`${isDarkMode ? 'text-white bg-slate-950' : 'bg-slate-50 text-black'}`}>{option.label}</option>)}
            </select>
		</div>
	)
}

export default Select
