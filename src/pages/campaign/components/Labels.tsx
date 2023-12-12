import { useState } from 'react'
import { FieldErrors } from 'react-hook-form'
import { HiPlus } from 'react-icons/hi2'
import useMenu from '../../../hooks/useMenu'
import LabelsMenu from './LabelsMenu'
import Label from './Label'

interface LabelsProps {
	defaultValues?: string[]
	labelOptions: Record<string, string>
	setValue: (name: string, value: unknown, config?: Object) => void
	errors: FieldErrors
	isDarkMode?: boolean
}

const Labels = ({ defaultValues = [], labelOptions, setValue, errors, isDarkMode = false }: LabelsProps) => {
	
	const [labels, setLabels] = useState(defaultValues)

	const updateLabels = (newLabels: string[]) => {
		setLabels(newLabels)
		setValue('labels', newLabels)
	}

	const addLabel = (newLabel: string) => {
		if (!labels.includes(newLabel)) {
			updateLabels([...labels, newLabel])
		}
	}

	const removeLabel = (oldLabel: string) => {
		updateLabels(labels.filter(label => label !== oldLabel))
	}

	const { menu, openMenu, closeMenu } = useMenu(
		Object.keys(labelOptions).reduce((menu: Record<string, () => void>, key) => {
			menu[key] = () => addLabel(key)
			return menu
		}, {})
	)

	return (
		<div className={`p-2 mb-2 rounded ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
			<div className="flex justify-between items-center">
				<span className="grow text-sm uppercase font-bold text-slate-500 pb-1">Labels</span>
				{errors.labels && <span className="text-red-500 uppercase font-bold text-sm">{errors.labels?.message?.toString()}</span>}
			</div>
			<div className="flex justify-between items-center">
				<div className="flex justify-start items-center grow flex-wrap gap-1">
					{labels.map(label => <Label key={label} label={label} color={labelOptions[label]} onRemove={removeLabel} />)}
				</div>
				<div className="relative">
					<button onClick={openMenu} className={`grid place-content-center w-8 h-8 text-lg rounded-full ${isDarkMode ? 'text-white hover:bg-slate-950' : 'text-black hover:bg-slate-200'}`}>
						<span className="sr-only">Add Label</span>
                        <HiPlus />
					</button>
					<LabelsMenu menu={menu} onClose={closeMenu} />
				</div>
			</div>
		</div>
	)
}

export default Labels
