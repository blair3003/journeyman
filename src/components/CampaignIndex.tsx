import { useLayoutContext } from '../context/LayoutContext'

const CampaignIndex = () => {

    const { handleDrawer } = useLayoutContext()    

    return (
        <>
            <button type="button" onClick={() => handleDrawer(<div>Campaigns info</div>)}>Campaigns info</button>
            <button type="button" onClick={() => handleDrawer(<p>Other info</p>)}>Other info</button>
            <button type="button" onClick={() => handleDrawer()}>Clear</button>
        </>
    )
}

export default CampaignIndex