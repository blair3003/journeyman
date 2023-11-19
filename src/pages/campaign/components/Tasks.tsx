import { useState } from 'react'
import { FieldErrors } from 'react-hook-form'
import { HiXMark, HiPlus } from 'react-icons/hi2'
import Task from './Task'

interface TasksProps {
	defaultValues?: Task[]
	setValue: (name: string, value: unknown, config?: Object) => void
	errors: FieldErrors
}

const Tasks = ({ defaultValues = [], setValue, errors }: TasksProps) => {
	
	const [tasks, setTasks] = useState(defaultValues)
    const [newTaskLabel, setNewTaskLabel] = useState('')

    const updateTasks = (newTasks: Task[]) => {
        setTasks(newTasks)
        setValue('tasks', newTasks)
    }

	const addTask = () => {
        if (!newTaskLabel) return
        const id = (tasks.length) ? Number(tasks[tasks.length - 1].id) + 1 : 1
        updateTasks([...tasks, { id: id.toString(), label: newTaskLabel, checked: false }])
        setNewTaskLabel('')
	}

	const removeTask = (oldTaskID: string) => {
		updateTasks(tasks.filter(task => task.id !== oldTaskID))
	}

	const checkTask = (taskID: string) => {
        updateTasks(tasks.map(task => task.id === taskID ? { ...task, checked: !task.checked } : task))
	}

	return (
		<div className="bg-white border-gray-300 border-2 rounded p-2 mb-2">
			<div className="flex justify-between items-center mb-1">
				<span className="text-black uppercase font-bold text-xs">Tasks</span>
				{errors.tasks && <span className="text-red-500 uppercase font-bold text-xs">{errors.tasks?.message?.toString()}</span>}
			</div>
			<div className="">
				<div className="">
					{tasks.map(task => <Task key={task.id} id={task.id} label={task.label} checked={task.checked} onCheck={checkTask} onRemove={removeTask} />)}
				</div>
				<div className="flex">
                    <input
                        type="text"
                        value={newTaskLabel}
                        onChange={e => setNewTaskLabel(e.target.value)}
                        placeholder="Add a Task..."
                    />
					{newTaskLabel &&<button onClick={e => { e.preventDefault(); setNewTaskLabel('') }} className="flex items-center">
						<span className="sr-only">Clear Task</span>
                        <HiXMark />
					</button>}
					<button onClick={e => { e.preventDefault(); addTask() }} className="flex items-center">
						<span className="sr-only">Add Task</span>
                        <HiPlus />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Tasks
