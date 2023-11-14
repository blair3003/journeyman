import { useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import Input from '../../../components/Input'
import Textarea from '../../../components/Textarea'
import SubmitButton from '../../../components/SubmitButton'

interface EditMissionDetailsFormProps {
    mission: Mission
    onSubmit?: (updatedMission: Mission) => void
}

const EditMissionDetailsForm = ({ mission, onSubmit }: EditMissionDetailsFormProps) => {

    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors, isSubmitting }
    } = useForm<FieldValues>({
        defaultValues: {
            title: mission.title,
            description: mission.description
        }
    })

    const updateMissionDetails = async (data: FieldValues) => {
        try {
            // TODO: update mission resource
            const updatedMission: Mission = { ...mission, ...data }
            if (onSubmit) onSubmit(updatedMission)
        } catch (error) {
            console.error(error)
        }        
    }

    useEffect(() => {
        setFocus('title')
    }, [setFocus])


    return (
        <form onSubmit={handleSubmit(updateMissionDetails)}>
            <Input
                id="title"
                label="Title"
                register={register}
                errors={errors}
                required={true}
                disabled={isSubmitting}
            />
            <Textarea
                id="description"
                label="Description"
                register={register}
                errors={errors}
                disabled={isSubmitting}
            />
            <SubmitButton disabled={isSubmitting} label="Update" />
        </form>
    )
}

export default EditMissionDetailsForm