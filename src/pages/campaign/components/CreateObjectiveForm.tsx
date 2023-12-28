import { useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import Input from '../../../components/Input'
import SubmitButton from '../../../components/SubmitButton'
import Select from '../../../components/Select'
import { useAppContext } from '../../../context/AppContext'
import { useDataContext } from '../../../context/DataContext'
import { createObjectiveDoc } from '../../../services/firestore'

interface CreateObjectiveFormProps {
	campaignId: string
	missionId?: string
	onSubmit?: (newObjective: Objective) => void
}

const CreateObjectiveForm = ({ campaignId, missionId, onSubmit }: CreateObjectiveFormProps) => {

	const { isDarkMode } = useAppContext()
	const { missions } = useDataContext()
	
	const campaignMissions = missions.filter(mission => mission.campaign === campaignId)

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
			const { title, mission } = data
			const newObjective = await createObjectiveDoc(title, mission)
			if (!newObjective) throw new Error()
			if (onSubmit) onSubmit(newObjective)
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
				options={campaignMissions.map(mission => ({ label: mission.title, value: mission.id }))}
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