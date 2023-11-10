import { useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import Input from './Input'
import SubmitButton from './SubmitButton'

interface CreateCampaignFormProps {
	userId: string
	onSubmit?: () => void
}

const CreateCampaignForm = ({ userId, onSubmit }: CreateCampaignFormProps) => {

	const {
		register,
		handleSubmit,
        setFocus,
		formState: { errors, isSubmitting }
	} = useForm<FieldValues>()

	const createCampaign = async (data: FieldValues) => {
		try {
			console.log({ ...data, users: [userId] })
			if (onSubmit) onSubmit()
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
	    setFocus('title')
	}, [setFocus])

	return (
		<form onSubmit={handleSubmit(createCampaign)}>
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

export default CreateCampaignForm