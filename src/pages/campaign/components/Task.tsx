import { HiXMark } from 'react-icons/hi2'

interface TaskProps {
	id: string
	label: string
	checked: boolean
	onCheck: (id: string) => void
	onRemove: (id: string) => void
	isDarkMode?: boolean
}

const Task = ({ id, label, checked, onCheck, onRemove, isDarkMode = false }: TaskProps) => {

	return (
		<div className="flex items-start justify-start gap-2 mb-2">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={() => onCheck(id)}
                style={{ colorScheme: isDarkMode ? 'dark' : 'normal' }}
                className="h-6 cursor-pointer"
            />
            <label htmlFor={id} className={`grow flex-wrap text-base cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'}`}>{label}</label>
            <button onClick={e => { e.preventDefault(); onRemove(id) }} title="Remove Task" className={`rounded-full w-6 h-6 shrink-0 grid place-content-center ${isDarkMode ? 'text-white hover:bg-slate-950 focus:bg-slate-950' : 'text-black hover:bg-slate-50 focus:bg-slate-50'}`}>
                <span className="sr-only">Remove Task</span>
                <HiXMark />
            </button>
		</div>
	)
}

export default Task
