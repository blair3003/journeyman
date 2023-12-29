import { useForm, FieldValues } from 'react-hook-form'
import { HiMiniPaperAirplane } from 'react-icons/hi2'
import { useAuthContext } from '../../../context/AuthContext'
import { useAppContext } from '../../../context/AppContext'
import ProfilePic from '../../../components/ProfilePic'
import { useDataContext } from '../../../context/DataContext'
import { createObjectiveDocMessage } from '../../../services/firestore'

interface MessageFormProps {
	objectiveId: string
	onSubmit?: (updatedObjective: Objective) => void
}

const MessageForm = ({ objectiveId, onSubmit }: MessageFormProps) => {

	const { isDarkMode } = useAppContext()
	const { authUser } = useAuthContext()
	const { users, objectives } = useDataContext()

	const user = users.find(user => user.uid === authUser?.uid)
	const objective = objectives.find(objective => objective.id === objectiveId)

	const {
		register,
		handleSubmit,
        reset,
		formState: { errors, isSubmitting }
	} = useForm<FieldValues>()

	const postMessage = async (data: FieldValues) => {
		try {
			const { body } = data
			const updatedObjective = await createObjectiveDocMessage(objective!, user!.id, body)
			if (!updatedObjective) throw new Error()
			if (onSubmit) onSubmit(updatedObjective)
            reset()
		} catch (error) {
			console.error(error)
		}
	}

    if (!user) return null

	return (
		<form onSubmit={handleSubmit(postMessage)}>

			<div className="flex items-center gap-2 py-2">

				<div className="">
	                <span className="sr-only">{user.displayName}</span>
	                <ProfilePic photoURL={user?.displayPic} displayName={user.displayName} />
				</div>

				<div className={`flex gap-1 items-center grow rounded ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-black'}`}>
					<label htmlFor="body" className="sr-only">Message body</label>
					<input
						id="body"
						type="text"
						{...register('body', { required: true })}
						aria-invalid={errors.body ? "true" : "false"}
						style={{ colorScheme: isDarkMode ? 'dark' : 'normal' }}
						className={`bg-transparent py-1 px-2 text-sm w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 cursor-pointer rounded ${isDarkMode ? 'text-white' : 'text-black'}`}
						disabled={isSubmitting}
                        placeholder="Write a message..."
					/>
				</div>

				<button
					type="submit"
					title="Send Message"
					className={`grid place-content-center w-8 h-8 text-lg rounded-full ${isDarkMode ? 'text-white hover:bg-slate-950 focus:bg-slate-950' : 'text-black hover:bg-slate-200 focus:bg-slate-200'}`}
				>
					<span className="sr-only">Post Message</span>
					<HiMiniPaperAirplane />
				</button>

			</div>

		</form>
	)
}

export default MessageForm