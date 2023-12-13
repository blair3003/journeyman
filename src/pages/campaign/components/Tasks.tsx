import { useState } from 'react'
import { FieldErrors } from 'react-hook-form'
import { HiXMark, HiPlus } from 'react-icons/hi2'
import Task from './Task'

interface TasksProps {
	defaultValues?: Task[]
	setValue: (name: string, value: unknown, config?: Object) => void
	errors: FieldErrors
	isDarkMode?: boolean
}

const Tasks = ({ defaultValues = [], setValue, errors, isDarkMode = false }: TasksProps) => {
	
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
		<div className={`p-2 mb-2 rounded ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
			<div className="flex justify-between items-center">
				<span className="grow text-sm uppercase font-bold text-slate-500 pb-1">Tasks</span>
				{errors.tasks && <span className="text-red-500 uppercase font-bold text-sm">{errors.tasks?.message?.toString()}</span>}
			</div>
			<div className="">
				<div className="p-2">
					{tasks.map(task => <Task key={task.id} id={task.id} label={task.label} checked={task.checked} onCheck={checkTask} onRemove={removeTask} isDarkMode={isDarkMode} />)}
				</div>
				<div className="flex items-center gap-2">
					<div className={`flex gap-1 items-center grow rounded ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-black'}`}>
						<label htmlFor="newTask" className="sr-only">Add a Task</label>
						<input
							id="newTask"
							type="text"
							value={newTaskLabel}
							onChange={e => setNewTaskLabel(e.target.value)}
							placeholder="Add a Task..."
							style={{ colorScheme: isDarkMode ? 'dark' : 'normal' }}
							className={`bg-transparent py-1 px-2 text-sm w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 cursor-pointer rounded ${isDarkMode ? 'text-white' : 'text-black'}`}
						/>
						{newTaskLabel &&<button onClick={e => { e.preventDefault(); setNewTaskLabel('') }} className={`grid place-content-center w-6 h-6 text-lg rounded-full ${isDarkMode ? 'text-white' : 'text-black'}`}>
							<span className="sr-only">Clear Task</span>
							<HiXMark />
						</button>}
					</div>
					<button
						onClick={e => { e.preventDefault(); addTask() }}
						title="Add Task"
						className={`grid place-content-center w-8 h-8 text-lg rounded-full ${isDarkMode ? 'text-white hover:bg-slate-950 focus:bg-slate-950' : 'text-black hover:bg-slate-200 focus:bg-slate-200'}`}
					>
						<span className="sr-only">Add Task</span>
                        <HiPlus />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Tasks
