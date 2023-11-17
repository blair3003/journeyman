import { useCallback, useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import debounce from 'lodash/debounce'
import { options } from '../../../config/options'
import Input from '../../../components/Input'
import Textarea from '../../../components/Textarea'
import Select from '../../../components/Select'
import Radio from '../../../components/Radio'
import Labels from './Labels'

interface ObjectiveFormProps {
	objective: Objective
	missions: Mission[]
}

const ObjectiveForm = ({ objective, missions }: ObjectiveFormProps) => {

	const { labels, difficulty, priority } = options

	const {
		register,
		watch,
		setValue,
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
            <Select
                id="mission"
                label="Mission"
                register={register}
                options={missions.map(mission => ({ label: mission.title, value: mission.uid }))}
                defaultOptionLabel="--"
                errors={errors}
                required={true}
            />
        	{/* TODO: complete check */}
            <Input
                id="due"
                type="datetime-local"
                label="Due Date"
                register={register}
                errors={errors}
            />
            <Select
                id="priority"
                label="Priority"
                register={register}
                options={Object.keys(priority).map((key: string) => ({ label: priority[key as keyof typeof priority], value: key }))}
                defaultOptionLabel="--"
                errors={errors}
            />
            <Radio
                id="difficulty"
                label="Difficulty"
                register={register}
                options={Object.keys(difficulty).map(key => ({ label: difficulty[key as keyof typeof difficulty], value: key }))}
                errors={errors}
            />
            <Labels
            	deaultValues={objective?.labels}
		labelOptions={labels}
                setValue={setValue}
                errors={errors}
            />

	        {/* TODO: labels */}
	        {/* TODO: tasks */}
		    {/* TODO: party */}
			{/* TODO: comments */}

		</form>
	)
}

export default ObjectiveForm
