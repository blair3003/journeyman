import { useDataContext } from '../../../context/DataContext'
import { useLayoutContext } from '../../../context/LayoutContext'
import EditMissionDetailsForm from './EditMissionDetailsForm'
import MissionDetails from './MissionDetails'

interface EditMissionDetailsProps {
    mission: Mission
    focus?: string
}

const EditMissionDetails = ({ mission, focus }: EditMissionDetailsProps) => {

    const { openDrawer } = useLayoutContext()
    const { missions, setMissions } = useDataContext()

    const onUpdate = (updatedMission: Mission) => {
        setMissions([...missions.filter(mission => mission.id !== updatedMission.id), updatedMission])
        openDrawer(<MissionDetails mission={updatedMission} />)
    }

    return (
        <section className="p-4">
            <h2 className="uppercase text-sm font-bold p-2 text-slate-500">Edit Mission Details</h2>
            <EditMissionDetailsForm mission={mission} onSubmit={onUpdate} focus={focus} />
        </section>
    )
}

export default EditMissionDetails