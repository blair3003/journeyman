import { useForm } from 'react-hook-form'
import Loader from './Loader'
import { useLayoutContext } from '../context/LayoutContext'
import { useEffect } from 'react'

interface CreateObjectiveProps {
	missionId: string
}

interface Inputs {
	title: string
	description: string
}

const CreateObjective = ({ missionId }: CreateObjectiveProps) => {

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
		<section>
			<h2>Create Objective</h2>		
			<form onSubmit={handleSubmit(onSubmit)}>
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
				<button disabled={isSubmitting}>
					{isSubmitting ? <Loader /> : <span>Submit</span>}				
				</button>
			</form>
		</section>
	)

}

export default CreateObjective
