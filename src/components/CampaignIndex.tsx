import { useLayoutContext } from '../context/LayoutContext'

const CampaignIndex = () => {

    const { toggleDrawer } = useLayoutContext()    

    return (
        <section>
            <button type="button" onClick={() => toggleDrawer(<div>Campaigns info</div>)}>Campaigns info</button>
            <button type="button" onClick={() => toggleDrawer(<p>Other info</p>)}>Other info</button>
            <button type="button" onClick={() => toggleDrawer()}>Clear</button>
        </section>
    )
}

export default CampaignIndex