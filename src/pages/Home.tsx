import { Link } from 'react-router-dom'

const Home = () => {

    return (
        <section>
            <h1>Home</h1>           

            <section>
                <h2>Links</h2>
                <ul>
                    <li><Link to='/u/8d0ca80caf68449a0a28/campaigns'>Blair's campaigns</Link></li>
                    <li><Link to='/u/40d1e569c3df59f8a10e/campaigns'>Jasmine's campaigns</Link></li>
                </ul>
            </section>
            
        </section>
    )
}

export default Home