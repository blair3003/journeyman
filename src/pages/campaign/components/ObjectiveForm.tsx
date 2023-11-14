import { useCallback, useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import debounce from 'lodash/debounce'
import Input from '../../../components/Input'
import Textarea from '../../../components/Textarea'

interface ObjectiveFormProps {
	objective: Objective
}

const ObjectiveForm = ({ objective }: ObjectiveFormProps) => {

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		mode: 'onChange',
		defaultValues: {
			...objective
		}
	})

	const updateObjective = async (data: FieldValues) => {
		try {
			console.log(data)
		} catch (error) {
			console.error(error)
		}
	}

	const debounceUpdate = useCallback(
		debounce((data: FieldValues) => updateObjective(data), 1000),
		[updateObjective]
	)

	useEffect(() => {
		const subscription = watch(() => handleSubmit(debounceUpdate)())
    	return () => subscription.unsubscribe()
	}, [watch, handleSubmit])

	return (
		<form onSubmit={e => e.preventDefault()}>
			<Input
				id="title"
				label="Title"
				register={register}
				errors={errors}
				required={true}
			/>			
            <Textarea
                id="description"
                label="Description"
                register={register}
                errors={errors}
            />
		</form>
	)
}

export default ObjectiveForm
