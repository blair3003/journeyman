import { format } from 'date-fns'
import { useDataContext } from '../../../context/DataContext'
import ProfilePic from '../../../components/ProfilePic'
import { useAppContext } from '../../../context/AppContext'
import { useAuthContext } from '../../../context/AuthContext'

interface MessageProps {
	message: Message
}

const Message = ({ message }: MessageProps) => {

	const { isDarkMode } = useAppContext()
	const { authUser } = useAuthContext()
	const { users } = useDataContext()

	const user = users.find(user => user.id === message.user)
	if (!user) return null

	return (
		<div className="flex items-start justify-between p-2 gap-2">	
			<div className="">
                <span className="sr-only">{user.displayName}</span>
                <ProfilePic photoURL={user?.displayPic} displayName={user.displayName!} />
			</div>
			<div className={`grow ${isDarkMode ? 'text-white' : 'text-black'}`}>
				<div className="flex items-center justify-start gap-2 text-slate-500 text-sm">
					<div>{user.displayName}</div>
					<div>{format(message.createdAt, "dd MMM 'at' HH:mm")}</div>
				</div>
				<div className="mb-1">{message.body}</div>
				{user.uid === authUser?.uid && <div className="text-slate-500 text-sm"><a className="underline" href="#">Edit</a> • <a className="underline" href="#">Delete</a></div>}
			</div>

		</div>
	)
}

export default Message