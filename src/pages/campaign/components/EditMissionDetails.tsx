import { useLayoutContext } from '../../../context/LayoutContext'
import EditMissionDetailsForm from './EditMissionDetailsForm'
import MissionDetails from './MissionDetails'

interface EditMissionDetailsProps {
    mission: Mission
}

const EditMissionDetails = ({ mission }: EditMissionDetailsProps) => {

    const { openDrawer } = useLayoutContext()

    const onUpdate = (updatedMission: Mission) => {
        console.log('Mission updated')
        console.log(updatedMission)
        openDrawer(<MissionDetails mission={updatedMission} />)
    }

    return (
        <section>
            <h2>Edit Mission Details</h2>
            <EditMissionDetailsForm mission={mission} onSubmit={onUpdate} />
        </section>
    )
}

export default EditMissionDetails