interface CreateObjectiveFormProps {
	missionId?: string
}

const CreateObjectiveForm = ({ missionId }: CreateObjectiveFormProps) => {

	return (
		<>CreateObjectiveForm {missionId ? `M# ${missionId}` : null}</>
	)
}

export default CreateObjectiveForm