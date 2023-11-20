import MessageForm from './MessageForm'
import Message from './Message'

interface MessagesProps {
    objectiveID: string
	messages?: Message[]
}

const Messages = ({ objectiveID, messages = [] }: MessagesProps) => {

	return (
		<section>
			<h3>Messages</h3>
			<MessageForm objectiveID={objectiveID} />
			{messages.map((message, index) => <Message key={index} message={message} />)}
		</section>
	)
}

export default Messages