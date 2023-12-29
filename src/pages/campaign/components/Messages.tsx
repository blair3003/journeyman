import MessageForm from './MessageForm'
import Message from './Message'
import { useAppContext } from '../../../context/AppContext'
import { useDataContext } from '../../../context/DataContext'

interface MessagesProps {
    objectiveId: string
	messages?: Message[]
}

const Messages = ({ objectiveId, messages = [] }: MessagesProps) => {

	const { isDarkMode } = useAppContext()
	const { objectives, setObjectives } = useDataContext()

	const onCreate = (updatedObjective: Objective) => {
		setObjectives([...objectives.filter(objective => objective.id !== updatedObjective.id), updatedObjective])
	}

	return (
		<section className={`p-2 mb-2 rounded ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
			<h3 className="grow text-sm uppercase font-bold text-slate-500 pb-1">Messages</h3>
			<MessageForm objectiveId={objectiveId} onSubmit={onCreate}/>
			{messages.map((message, index) => <Message key={index} message={message} />)}
		</section>
	)
}

export default Messages