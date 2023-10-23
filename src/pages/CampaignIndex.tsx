import { useLayoutContext } from '../context/LayoutContext'

const CampaignIndex = () => {

    console.log(`Campaign Index rendered`)

    const { openDrawer } = useLayoutContext()    

    return (
        <section>
            <button type="button" onClick={() => openDrawer(<div>Campaigns info</div>)}>Campaigns info</button>
            <button type="button" onClick={() => openDrawer(<p>Other info</p>)}>Other info</button>
            <button type="button" onClick={() => openDrawer(null)}>Clear</button>
        </section>
    )
}

export default CampaignIndex