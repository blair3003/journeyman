import MessageForm from './MessageForm'
import Message from './Message'
import { useAppContext } from '../../../context/AppContext'

interface MessagesProps {
    objectiveID: string
	messages?: Message[]
}

const Messages = ({ objectiveID, messages = [] }: MessagesProps) => {

	const { isDarkMode } = useAppContext()

	return (
		<section className={`p-2 mb-2 rounded ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
			<h3 className="grow text-sm uppercase font-bold text-slate-500 pb-1">Messages</h3>
			<MessageForm objectiveID={objectiveID} />
			{messages.map((message, index) => <Message key={index} message={message} />)}
		</section>
	)
}

export default Messages