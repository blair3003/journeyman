import { useState } from 'react'
import { FieldErrors } from 'react-hook-form'
import { HiPlus } from 'react-icons/hi2'
import { options } from '../../../config/options'
import useMenu from '../../../hooks/useMenu'
import LabelsMenu from './LabelsMenu'
import Label from './Label'

interface LabelsProps {
	defaultValues?: string[]
	labelOptions: Record<string, string>[]
	setValue: (name: string, value: unknown, config?: Object) => void
	errors: FieldErrors
}

const Labels = ({ defaultValues = [], labelOptions, setValue, errors }: LabelsProps) => {
	
	const [labels, setLabels] = useState(defaultValues)

	const addLabel = (newLabel: string) => {
		if (!labels.includes(newLabel)) {
			setLabels(oldLabels => [...oldLabels, newLabel])
			setValue('labels', labels)
		}
	}

	const removeLabel = (oldLabel: string) => {
		setLabels(oldLabels => oldLabels.filter(label => label !== oldLabel))
		setValue('labels', labels)
	}

	const { menu, openMenu, closeMenu } = useMenu(
		labelOptions.reduce((menu, key) => {
			menu[key] = () => addLabel(key)
			return menu
		})
	)


	return (
		<div className="bg-white border-gray-300 border-2 rounded p-2 mb-2">
			<div className="flex justify-between items-center mb-1">
				<span className="text-black uppercase font-bold text-xs">Labels</span>
				{errors.labels && <span className="text-red-500 uppercase font-bold text-xs">{errors.labels?.message?.toString()}</span>}
			</div>
			<div className="flex justify-between items-center">
				<div className="flex justify-start items-center">
					{labels.map(label => <Label label={label} color={labelOptions[label]} onRemove={removeLabel} />)}
				</div>
				<div className="relative">
					<button onClick={openMenu} className="flex items-center">
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
