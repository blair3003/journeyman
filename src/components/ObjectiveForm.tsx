import { useCallback, useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import debounce from 'lodash/debounce'
import Input from './Input'
import Textarea from './Textarea'

interface ObjectiveFormProps {
	objective: Objective
}

const ObjectiveForm = ({ objective }: ObjectiveFormProps) => {

	const {
		register,
		watch,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting }
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

	const debouncedUpdate = useCallback(
		debounce((data: FieldValues) => {
			console.log('debouncing')
			updateObjective(data)
		}, 1000), [updateObjective]
	)

	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			console.log('Input updated')
			console.log(value, name, type)
			handleSubmit(debouncedUpdate)()
		})
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
