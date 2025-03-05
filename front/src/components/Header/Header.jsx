import {Link} from 'react-router-dom'
import '../Header/Header.css'
import '../../index.css'
import Button from '../../materialuiComponents/Button'

export default function Header(){
    return(
        <div className="HeaderDiv ReadexFont">
            <Link to='/'>
                <img src="/images/headerLogo.svg" alt="" />
            </Link>
            <nav className="navMenu">
                <Link to="/findJob" className="navLink">Candidates</Link>
                <Link to="/employers" className="navLink">Employers</Link>
                <Link to="/company" className="navLink">Company</Link>
                <Link to="/FAQ" className="navLink">FAQ</Link>
            </nav>
            <div className="profileDiv">
                <img src="/images/User_solid.svg" alt="" />
                <p>Login</p>
            </div>
            <div className="headerButtonsDiv">
                <Button className="ReadexFont" text="Start hiring" backgroundColor="rgb(255,255,255)" color="rgb(127,135,100)" fontSize="12px"/>
                <Button className="ReadexFont" text="Find a job" backgroundColor="rgb(61,66,90)" color="rgb(255,255,255)" fontSize="12px"/>
            </div>
        </div>
    )
}