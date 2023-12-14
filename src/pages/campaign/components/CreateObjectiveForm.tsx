import { useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import Input from '../../../components/Input'
import SubmitButton from '../../../components/SubmitButton'
import Select from '../../../components/Select'
import { useAppContext } from '../../../context/AppContext'

interface CreateObjectiveFormProps {
	missions: Mission[]
	missionId?: string
	onSubmit?: () => void
}

const CreateObjectiveForm = ({ missions, missionId, onSubmit }: CreateObjectiveFormProps) => {

	const { isDarkMode } = useAppContext()

	const {
		register,
		handleSubmit,
        setFocus,
		formState: { errors, isSubmitting }
	} = useForm<FieldValues>({
		defaultValues: {
			mission: missionId
		}
	})

	const createObjective = async (data: FieldValues) => {
		try {
			console.log({ ...data })
			if (onSubmit) onSubmit()
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
	    setFocus('title')
	}, [setFocus])

	return (
		<form onSubmit={handleSubmit(createObjective)}>
			<Input
				id="title"
				label="Title"
				register={register}
				errors={errors}
				required={true}
				disabled={isSubmitting}
				isDarkMode={isDarkMode}
			/>
			<Select
				id="mission"
				label="Mission"
				register={register}
				options={missions.map(mission => ({ label: mission.title, value: mission.uid }))}
				defaultOptionLabel="--Please choose a mission--"
				errors={errors}
				required={true}
				disabled={isSubmitting}
				isDarkMode={isDarkMode}
			/>
			<SubmitButton disabled={isSubmitting} label="Create" />
		</form>
	)
}

export default CreateObjectiveForm