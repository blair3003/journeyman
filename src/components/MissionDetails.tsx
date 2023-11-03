import { useEffect, useRef } from 'react'
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
		watch,
		formState: { errors, isValid }
	} = useForm<Inputs>({
		defaultValues: {
			title: mission.title,
			description: mission.description || ''
		},
		mode: 'onChange'
	})

	const title = watch('title')
	const description = watch('description')


	// dont like this function at all
	const handleUpdateMission = useRef(
		debounce((data: Inputs) => {
			console.log(`Updating Mission`)
			console.log(data)
		}, 1000)
	).current

	useEffect(() => {
		// useEffect running on first render
		// isValid doesnt work when title field is emptied
		if (!isValid) return
		handleUpdateMission({
			title,
			description
		})
	}, [isValid, title, description])
	
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
