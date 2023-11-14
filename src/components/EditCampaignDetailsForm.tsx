import { useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import Input from './Input'
import SubmitButton from './SubmitButton'

interface EditCampaignDetailsFormProps {
    campaign: Campaign
    onSubmit?: (updatedCampaign: Campaign) => void
}

const EditCampaignDetailsForm = ({ campaign, onSubmit }: EditCampaignDetailsFormProps) => {

    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors, isSubmitting }
    } = useForm<FieldValues>({
        defaultValues: {
            title: campaign.title
        }
    })

    const updateCampaignDetails = async (data: FieldValues) => {
        try {
            // TODO: update campaign resource
            const updatedCampaign: Campaign = { ...campaign, ...data }
            if (onSubmit) onSubmit(updatedCampaign)
        } catch (error) {
            console.error(error)
        }        
    }

    useEffect(() => {
        setFocus('title')
    }, [setFocus])


    return (
        <form onSubmit={handleSubmit(updateCampaignDetails)}>
            <Input
                id="title"
                label="Title"
                register={register}
                errors={errors}
                required={true}
                disabled={isSubmitting}
            />
            <SubmitButton disabled={isSubmitting} label="Update" />
        </form>
    )
}

export default EditCampaignDetailsForm