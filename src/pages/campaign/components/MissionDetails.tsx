import { HiPencil } from 'react-icons/hi2'
import { useLayoutContext } from '../../../context/LayoutContext'
import EditMissionDetails from './EditMissionDetails'
import { useAppContext } from '../../../context/AppContext'

interface MissionDetailsProps {
    mission: Mission
}

const MissionDetails = ({ mission }: MissionDetailsProps) => {

    const { isDarkMode } = useAppContext()
    const { openDrawer } = useLayoutContext()

    const handleEdit = () => openDrawer(<EditMissionDetails mission={mission} />)

    return (
        <section className="p-4">
            <header className="flex align-top justify-between">
                <h2 className="uppercase text-sm font-bold p-2 text-slate-500">Mission Details</h2>
                <button
                    onClick={handleEdit}
                    className={`p-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
                >
                    <span className="sr-only">Edit Mission Details</span>
                    <HiPencil />
                </button>
            </header>
            <div className={`rounded p-2 mb-2 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50' }`}>
                <div className="mb-1">
                    <span className={`uppercase font-bold text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-800'}`}>Title</span>
                </div>
                <div>
                    <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>{mission.title}</span>
                </div>
            </div>
            <div className={`rounded p-2 mb-2 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50' }`}>
                <div className="mb-1">
                    <span className={`uppercase font-bold text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-800'}`}>Description</span>
                </div>
                <div>
                    <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>{mission.description}</span>
                </div>
            </div>
        </section>
    )
}

export default MissionDetails