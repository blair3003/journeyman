import { useAppContext } from '../context/AppContext'
import { useLayoutContext } from '../context/LayoutContext'

const Campaigns = () => {

    console.log(`Campaigns page rendered`)

    const { openDrawer } = useLayoutContext()
    const { campaigns } = useAppContext()

    console.log(campaigns)


    return (
        <section>
            <button type="button" onClick={() => openDrawer(<div>Campaigns info</div>)}>Campaigns info</button>
            <button type="button" onClick={() => openDrawer(<p>Other info</p>)}>Other info</button>
        </section>
    )
}

export default Campaigns
