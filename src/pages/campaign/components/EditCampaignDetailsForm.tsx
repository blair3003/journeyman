import { useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import Input from '../../../components/Input'
import SubmitButton from '../../../components/SubmitButton'
import { useAppContext } from '../../../context/AppContext'
import { updateCampaignDoc } from '../../../services/firestore'

interface EditCampaignDetailsFormProps {
    campaign: Campaign
    onSubmit?: (updatedCampaign: Campaign) => void
}

const EditCampaignDetailsForm = ({ campaign, onSubmit }: EditCampaignDetailsFormProps) => {

    const { isDarkMode } = useAppContext()

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
            const { title } = data
            const updatedCampaign = await updateCampaignDoc(campaign, { title })
            if (!updatedCampaign) throw new Error()
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
                isDarkMode={isDarkMode}
            />
            <SubmitButton disabled={isSubmitting} label="Update" />
        </form>
    )
}

export default EditCampaignDetailsForm