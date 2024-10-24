import {Link} from 'react-router-dom'
import '../Header/Header.css'
import '../../index.css'
import Button from '../../materialuiComponents/Button'
import HeaderLogo from '../../images/headerLogo.svg'
import userPhoto from '../../images/User_solid.svg'

export default function Header(){
    return(
        <div className="HeaderDiv ReadexFont">
            <div>
                <img src={HeaderLogo} alt="" />
            </div>
            <nav cassName="navMenu">
                <Link to="/employers" className="navLink">Employers</Link>
                <Link to="/candidates"className="navLink">Candidates</Link>
                <Link to="/company"className="navLink">Company</Link>
                <Link to="/blog"className="navLink">Blog</Link>
            </nav>
            <div className="profileDiv">
                <img src={userPhoto} alt="" />
                <p>Login</p>
            </div>
            <div>
                <Button className="ReadexFont" text="Start hiring" backgroundColor="rgb(255,255,255)" color="rgb(127,135,100)" fontSize="12px"/>
                <Button className="ReadexFont" text="Find a job" backgroundColor="rgb(61,66,90)" color="rgb(255,255,255)" fontSize="12px"/>
            </div>
        </div>
    )
}