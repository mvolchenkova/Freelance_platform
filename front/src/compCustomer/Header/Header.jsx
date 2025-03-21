import {Link} from 'react-router-dom'
import '../Header/Header.css'
import '../../index.css'
import Button from '../../materialuiComponents/Button'
import { logout } from '../../store/Slices/userSlicer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'


export default function Header(){
    const dispatch = useDispatch();

    const user =  JSON.parse(localStorage.getItem('currentUser'));
    const status = useSelector(state => state.users.users.status);
    if(status === 'loading'){
        return <div>asdasd</div>
    }
    console.log(status);
    const getLogout = ()=>{
        dispatch(logout());
        window.location.reload();
        localStorage.removeItem('currentUser');
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
            <div className="profileDiv">
                
                {user?(
                    <button className="ReadexFont buttonLogout" onClick={getLogout}>
                        Logout
                    </button>
                ):(
                    <>
                        <img src="/images/User_solid.svg" alt="" />
                        <Link to='/login'>
                        Login
                        </Link>
                    </>
                )}
                
            </div>
            {
                user?(
                   <Link to='profile'>
                    <Button className="ReadexFont" text="Profile" backgroundColor="rgb(61,66,90)" color="rgb(255,255,255)" fontSize="12px"/>
                   </Link> 
                ) : (
                    <div className="headerButtonsDiv">
                    <Button className="ReadexFont" text="Start hiring" backgroundColor="rgb(255,255,255)" color="rgb(127,135,100)" fontSize="12px"/>
                    <Button className="ReadexFont" text="Find a job" backgroundColor="rgb(61,66,90)" color="rgb(255,255,255)" fontSize="12px"/>
                </div>
                )
            }
           
        </div>
    )
}