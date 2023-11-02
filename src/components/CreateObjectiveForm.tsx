import { useForm } from 'react-hook-form'
import Loader from './Loader'
import { useLayoutContext } from '../context/LayoutContext'
import { useEffect } from 'react'

interface CreateObjectiveFormProps {
	missionId: string
}

interface Inputs {
	title: string
	description: string
}

const CreateObjectiveForm = ({ missionId }: CreateObjectiveFormProps) => {

	const { closeDrawer } = useLayoutContext()

	const {
		register,
		handleSubmit,
        setFocus,
		formState: { errors, isSubmitting }
	} = useForm<Inputs>()

	const onSubmit = (data: Inputs) => {
		console.log(missionId)
		console.log(data)
		closeDrawer()
	}

    useEffect(() => {
        setFocus('title')
    }, [setFocus])

	return (		
		<form onSubmit={handleSubmit(onSubmit)}>

			{/*Title*/}
			<div>
				<div className="flex justify-between">
					<label htmlFor="title">Title</label>
					{(errors.title?.type === 'required') && <span>This field is required</span>}
				</div>
				<input
					id="title"
					type="text"
					{...register("title", { required: true })}
					aria-invalid={errors.title ? "true" : "false"}
				/>
			</div>

			{/*Description*/}
			<div>
				<div>
					<label htmlFor="description">Description</label>
				</div>
				<textarea id="description" {...register("description")}></textarea>
			</div>

			<button disabled={isSubmitting}>
				{isSubmitting ? <Loader /> : <span>Submit</span>}				
			</button>
		</form>
	)

}

export default CreateObjectiveForm