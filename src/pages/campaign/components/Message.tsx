import { useMemo } from 'react'
import { format, parseISO } from 'date-fns'
import { useDataContext } from '../../../context/DataContext'

interface MessageProps {
	message: Message
}

const Message = ({ message }: MessageProps) => {

	const { users } = useDataContext()

	const user = useMemo(() => users.find(user => user.uid === message.user), [])
	const createdAt = useMemo(() => parseISO(message.createdAt.toString()), [message.createdAt])

	if (!user) return null

	return (
		<div className="flex items-start justify-between">	
			<div className="w-6 h-6 rounded-full bg-blue-500 grid place-content-center">
                <span className="sr-only">{user.displayName}</span>
                <span>U</span>
			</div>
			<div className="grow">
				<div className="flex items-center justify-start">
					<div>{user.displayName}</div>
					<div>{format(createdAt, "dd MMM 'at' HH:mm")}</div>
				</div>
				<div>{message.body}</div>				
			</div>

		</div>
	)
}

export default Message