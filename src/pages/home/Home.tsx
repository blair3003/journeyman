import { Link } from 'react-router-dom'

const Home = () => {

    return (
        <section className="bg-slate-800">
            <h1>Home</h1>           

            <section>
                <h2>Links</h2>
                <ul>
                    <li><Link to='/u/bW7wGStixsBb2mx7MOtc/campaigns'>Blair's campaigns</Link></li>
                    <li><Link to='/u/ynXDLCKlCpkp8Ld39oZL/campaigns'>Forth Dev's campaigns</Link></li>
                    <li><Link to='/u/uDLAzYJDxNPxTMLzzqlt/campaigns'>Jasmine's campaigns</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/logout'>Logout</Link></li>
                </ul>
            </section>
            
        </section>
    )
}

export default Home