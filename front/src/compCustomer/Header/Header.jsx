import {Link} from 'react-router-dom'
import '../Header/Header.css'
import '../../index.css'
import { useSelector } from 'react-redux'


export default function Header(){
    const status = useSelector(state => state.users.users.status);
    if(status === 'loading'){
        return <div>Loading....</div>
    }

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
           
        </div>
    )
}