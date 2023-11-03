import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import debounce from 'lodash/debounce'

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
		formState: { errors, isValid }
	} = useForm<Inputs>({
		defaultValues: {
			title: mission.title,
			description: mission.description || ''
		},
		mode: 'onChange'
	})

	const handleUpdateMission = debounce((data) => {
		console.log(data)
	}, 1000)


	useEffect(() => {
		if (!isValid) return
		handleUpdateMission({
			'title': watch('title'),
			'description': watch('description')
		})
	}, [isValid, watch])
	
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
