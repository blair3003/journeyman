import { HiPencil } from 'react-icons/hi2'
import { useLayoutContext } from '../../../context/LayoutContext'
import EditMissionDetails from './EditMissionDetails'

interface MissionDetailsProps {
    mission: Mission
}

const MissionDetails = ({ mission }: MissionDetailsProps) => {

    const { openDrawer } = useLayoutContext()

    const handleEdit = () => openDrawer(<EditMissionDetails mission={mission} />)

    return (
        <section>
            <header className="flex align-top justify-between">
                <h2>Mission Details</h2>
                <button onClick={handleEdit}>
                    <span className="sr-only">Edit Mission Details</span>
                    <HiPencil />
                </button>
            </header>
            <div className="border-gray-300 border-2 rounded p-2 mb-2">
                <div className="mb-1">
                    <span className="text-black uppercase font-bold text-xs">Title</span>
                </div>
                <div>
                    <span>{mission.title}</span>
                </div>
            </div>
            <div className="border-gray-300 border-2 rounded p-2 mb-2">
                <div className="mb-1">
                    <span className="text-black uppercase font-bold text-xs">Description</span>
                </div>
                <div>
                    <span>{mission.description}</span>
                </div>
            </div>
        </section>
    )
}

export default MissionDetails