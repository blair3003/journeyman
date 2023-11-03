import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface MissionDetailsProps {
	mission: Mission
}

interface Inputs {
	title: string
	description: string
}

const MissionDetails = ({ mission }: MissionDetailsProps) => {

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<Inputs>({
		title: mission.title,
		description: mission.description || ''
	})

	// const onSubmit = (data: Inputs) => console.log(data)

	useEffect(() => {
	    const subscription = watch((value, { name, type }) => console.log(value, name, type))
	    // const subscription = watch(() => handleSubmit(onSubmit)())
	    return () => subscription.unsubscribe()
	}, [handleSubmit, watch])
	
	return (
		<section>
			<h2>MissionDetails</h2>
			<form onSubmit={e => e.preventDefault()}>
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
				<div>
					<div>
						<label htmlFor="description">Description</label>
					</div>
					<textarea id="description" {...register("description")}></textarea>
				</div>
			</form>
		</section>
	)
}

export default MissionDetails
