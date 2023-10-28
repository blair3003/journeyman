import { useAppContext } from '../context/AppContext'
import { useLayoutContext } from '../context/LayoutContext'

const Campaigns = () => {

    console.log(`Campaigns page rendered`)

    const { openDrawer } = useLayoutContext()
    const { campaigns, missions, objectives, isLoading, isError } = useAppContext()

    console.log(campaigns)
    console.log(missions)
    console.log(objectives)


    return (
        <section>
            {isLoading && <p>LOADING</p>}
            {isError && <p>ERROR</p>}
            <button type="button" onClick={() => openDrawer(<div>Campaigns info</div>)}>Campaigns info</button>
            <button type="button" onClick={() => openDrawer(<p>Other info</p>)}>Other info</button>
        </section>
    )
}

export default Campaigns
