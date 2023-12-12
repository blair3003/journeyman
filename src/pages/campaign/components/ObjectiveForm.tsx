import { useCallback, useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import debounce from 'lodash/debounce'
import { options } from '../../../config/options'
import Input from '../../../components/Input'
import Textarea from '../../../components/Textarea'
import Select from '../../../components/Select'
import Radio from '../../../components/Radio'
import Labels from './Labels'
import Tasks from './Tasks'
import Party from './Party'
import { useAppContext } from '../../../context/AppContext'

interface ObjectiveFormProps {
	objective: Objective
	missions: Mission[]
}

const ObjectiveForm = ({ objective, missions }: ObjectiveFormProps) => {

	const { isDarkMode } = useAppContext()
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
				isDarkMode={isDarkMode}
			/>
            <Textarea
                id="description"
                label="Description"
                register={register}
                errors={errors}
				isDarkMode={isDarkMode}
            />
            <Select
                id="mission"
                label="Mission"
                register={register}
                options={missions.map(mission => ({ label: mission.title, value: mission.uid }))}
                defaultOptionLabel="--"
                errors={errors}
                required={true}
				isDarkMode={isDarkMode}
            />
            <Input
                id="due"
                type="datetime-local"
                label="Due Date"
                register={register}
                errors={errors}
				isDarkMode={isDarkMode}
            />
            <Select
                id="priority"
                label="Priority"
                register={register}
                options={Object.keys(priority).map((key: string) => ({ label: priority[key as keyof typeof priority], value: key }))}
                defaultOptionLabel="--"
                errors={errors}
				isDarkMode={isDarkMode}
            />
            <Radio
                id="difficulty"
                label="Difficulty"
                register={register}
                options={Object.keys(difficulty).map(key => ({ label: difficulty[key as keyof typeof difficulty], value: key }))}
                errors={errors}
				isDarkMode={isDarkMode}
            />
            <Labels
            	defaultValues={objective?.labels}
				labelOptions={labels}
                setValue={setValue}
                errors={errors}
				isDarkMode={isDarkMode}
            />
            <Tasks
            	defaultValues={objective?.tasks}
                setValue={setValue}
                errors={errors}
				isDarkMode={isDarkMode}
            />
			<Party
				defaultValues={objective?.users}
                setValue={setValue}
                errors={errors}
				isDarkMode={isDarkMode}
			/>
		</form>
	)
}

export default ObjectiveForm
