import { useForm, FieldValues } from 'react-hook-form'
import { HiMiniPaperAirplane } from 'react-icons/hi2'
import { useAuthContext } from '../../../context/AuthContext'

interface MessageFormProps {
	objectiveID: string
}

const MessageForm = ({ objectiveID }: MessageFormProps) => {

	const { auth } = useAuthContext()

	const {
		register,
		handleSubmit,
        reset,
		formState: { errors, isSubmitting }
	} = useForm<FieldValues>()

	const postMessage = async (data: FieldValues) => {
		try {
			console.log({ ...data, objective: objectiveID, user: auth?.uid })
            reset()
		} catch (error) {
			console.error(error)
		}
	}

    if (!auth) return null

	return (
		<form onSubmit={handleSubmit(postMessage)}>

			<div className="flex items-start justify-between">

				<div className="w-6 h-6 rounded-full">
	                <span className="sr-only">{auth.displayName}</span>
	                <span>U</span>
				</div>

				<div className="grow">
					<label htmlFor="body" className="sr-only">Message body</label>
					<input
						id="body"
						type="text"
						{...register('body', { required: true })}
						aria-invalid={errors.body ? "true" : "false"}
						className="w-full bg-transparent"
						disabled={isSubmitting}
                        placeholder="Write a message..."
					/>
					{errors.body && <span className="text-red-500 uppercase font-bold text-xs">{errors.body?.type === 'required' ? 'This field is required' : errors.body?.message?.toString()}</span>}

				</div>

				<button
					type="submit"
					className=""
				>
					<span className="sr-only">Post Message</span>
					<HiMiniPaperAirplane />
				</button>

			</div>

		</form>
	)
}

export default MessageForm