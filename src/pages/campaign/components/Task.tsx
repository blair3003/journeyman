import { HiXMark } from 'react-icons/hi2'

interface TaskProps {
	id: string
	label: string
	checked: boolean
	onCheck: (id: string) => void
	onRemove: (id: string) => void
}

const Task = ({ id, label, checked, onCheck, onRemove }: TaskProps) => {

	return (
		<div className="">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={() => onCheck(id)}
            />
            <label htmlFor={id}>{label}</label>
            <button onClick={e => { e.preventDefault(); onRemove(id) }}>
                <span className="sr-only">Remove Task</span>
                <HiXMark />
            </button>
		</div>
	)
}

export default Task
