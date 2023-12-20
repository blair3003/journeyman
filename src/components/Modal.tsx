import { useEffect, useRef } from 'react'
import { HiXMark } from 'react-icons/hi2'
import { useAppContext } from '../context/AppContext'

interface ModalProps {
	title: string
	onClose?: () => void
	children: React.ReactNode
}

const Modal = ({ title, onClose, children }: ModalProps) => {	

	const { isDarkMode } = useAppContext()
	const dialogRef = useRef<HTMLDialogElement | null>(null)

	const handleClose = () => {
		if (onClose) onClose()
		dialogRef.current?.close()
	}

	useEffect(() => {
		(children)
		? dialogRef.current?.showModal()
		: dialogRef.current?.close()
	}, [children])

	return (
		<dialog ref={dialogRef} className="max-h-screen w-[35rem] p-8 bg-transparent" tabIndex={-1}>
			<section className={`p-4 rounded-xl shadow-xl border-2  ${isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-slate-50 border-slate-300'}`}>
				<header className="flex justify-between items-center mb-4">
					<h2 className="text-slate-500 text-sm uppercase font-bold">{title}</h2>
					<button onClick={handleClose} className={`rounded-full w-12 h-12 grid place-content-center text-xl ${isDarkMode ? 'text-white hover:bg-slate-900' : 'text-black hover:bg-slate-100'}`}>
						<span className="sr-only">Close</span>
						<HiXMark /> 
					</button>
				</header>
				{children}
			</section>
		</dialog>
	)
}

export default Modal