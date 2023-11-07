import { useEffect, useRef } from 'react'
import { HiXMark } from 'react-icons/hi2'

interface ModalProps {
	title: string
	onClose: () => void
	children: React.ReactNode
}

const Modal = ({ title, onClose, children }: ModalProps) => {	

	const dialogRef = useRef<HTMLDialogElement | null>(null)

	const handleClose = () => {
		onClose()
		dialogRef.current?.close()
	}

	useEffect(() => {
		(children)
		? dialogRef.current?.showModal()
		: dialogRef.current?.close()
	}, [children])

	return (
		<dialog ref={dialogRef}>
			<header className="flex justify-between">
				<h2>{title}</h2>
				<button onClick={handleClose}>
					<span className="sr-only">Close</span>
					<HiXMark />
				</button>
			</header>
			{children}
		</dialog>
	)
}

export default Modal