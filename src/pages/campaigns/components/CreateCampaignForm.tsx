import { useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import Input from '../../../components/Input'
import SubmitButton from '../../../components/SubmitButton'
import { useAppContext } from '../../../context/AppContext'
import { useDataContext } from '../../../context/DataContext'
import { useAuthContext } from '../../../context/AuthContext'
import { createCampaignDoc } from '../../../services/firestore'

interface CreateCampaignFormProps {
	onSubmit?: (newCampaign: Campaign) => void 
}

const CreateCampaignForm = ({ onSubmit }: CreateCampaignFormProps) => {

	const { isDarkMode } = useAppContext()
	const { users } = useDataContext()
	const { authUser } = useAuthContext()

	

	const {
		register,
		handleSubmit,
        setFocus,
		formState: { errors, isSubmitting }
	} = useForm<FieldValues>()

	const createCampaign = async (data: FieldValues) => {
		try {
			const { title } = data
			const userId = users.find(user => user.uid === authUser?.uid)?.id
			if (!userId) throw new Error()
			const newCampaign = await createCampaignDoc(title, userId)
			if (!newCampaign) throw new Error()
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