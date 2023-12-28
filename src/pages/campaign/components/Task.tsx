import { HiXMark } from 'react-icons/hi2'

interface TaskProps {
    index: number
	label: string
	checked: boolean
	onCheck: (index: number) => void
	onRemove: (index: number) => void
	isDarkMode?: boolean
}

const Task = ({ index, label, checked, onCheck, onRemove, isDarkMode = false }: TaskProps) => {

	return (
		<div className="flex items-start justify-start gap-2 mb-2">
            <input
                id={index.toString()}
                type="checkbox"
                checked={checked}
                onChange={() => onCheck(index)}
                style={{ colorScheme: isDarkMode ? 'dark' : 'normal' }}
                className="h-6 cursor-pointer"
            />
            <label htmlFor={index.toString()} className={`grow flex-wrap text-base cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'}`}>{label}</label>
            <button onClick={e => { e.preventDefault(); onRemove(index) }} title="Remove Task" className={`rounded-full w-6 h-6 shrink-0 grid place-content-center ${isDarkMode ? 'text-white hover:bg-slate-950 focus:bg-slate-950' : 'text-black hover:bg-slate-50 focus:bg-slate-50'}`}>
                <span className="sr-only">Remove Task</span>
                <HiXMark />
            </button>
		</div>
	)
}

export default Task
