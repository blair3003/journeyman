import { useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import Input from '../../../components/Input'
import SubmitButton from '../../../components/SubmitButton'
import { useAppContext } from '../../../context/AppContext'

interface CreateCampaignFormProps {
	userId: string
	onSubmit?: (newCampaign: Campaign) => void 
}

const CreateCampaignForm = ({ userId, onSubmit }: CreateCampaignFormProps) => {

	const { isDarkMode } = useAppContext()

	const {
		register,
		handleSubmit,
        setFocus,
		formState: { errors, isSubmitting }
	} = useForm<FieldValues>()

	const createCampaign = async (data: FieldValues) => {
		try {
			const newCampaign = { ...data, users: [userId], id: '1234' } as Campaign //Remember to remove this line
            if (onSubmit) onSubmit(newCampaign)
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
				isDarkMode={isDarkMode}
			/>
			<SubmitButton disabled={isSubmitting} label="Create" />
		</form>
	)
}

export default CreateCampaignForm