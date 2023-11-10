import { useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import Input from './Input'
import SubmitButton from './SubmitButton'

interface CreateMissionFormProps {
	campaignId: string
	onSubmit?: () => void
}

const CreateMissionForm = ({ campaignId, onSubmit }: CreateMissionFormProps) => {

	const {
		register,
		handleSubmit,
        setFocus,
		formState: { errors, isSubmitting }
	} = useForm<FieldValues>()

	const createMission = async (data: FieldValues) => {
		try {
			console.log({ ...data, campaign: campaignId })
			if (onSubmit) onSubmit()
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
			/>
			<SubmitButton disabled={isSubmitting} label="Create" />
		</form>
	)
}

export default CreateMissionForm