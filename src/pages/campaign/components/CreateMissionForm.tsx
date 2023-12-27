import { useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import Input from '../../../components/Input'
import SubmitButton from '../../../components/SubmitButton'
import { useAppContext } from '../../../context/AppContext'
import { createMissionDoc } from '../../../services/firestore'

interface CreateMissionFormProps {
	campaignId: string
	order: number
	onSubmit?: (newMission: Mission) => void
}

const CreateMissionForm = ({ campaignId, order, onSubmit }: CreateMissionFormProps) => {

	const { isDarkMode } = useAppContext()

	const {
		register,
		handleSubmit,
        setFocus,
		formState: { errors, isSubmitting }
	} = useForm<FieldValues>()

	const createMission = async (data: FieldValues) => {
		try {
			const { title } = data
			const newMission = await createMissionDoc(title, campaignId, order)
			if (!newMission) throw new Error()
			if (onSubmit) onSubmit(newMission)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
	    setFocus('title')
	}, [setFocus])

	return (
		<form onSubmit={handleSubmit(createMission)}>
			<Input
				id="title"
				label="Title"
				register={register}
				errors={errors}
				required={true}
				disabled={isSubmitting}
				isDarkMode={isDarkMode}
			/>
			<SubmitButton disabled={isSubmitting} label="Create" />
		</form>
	)
}

export default CreateMissionForm