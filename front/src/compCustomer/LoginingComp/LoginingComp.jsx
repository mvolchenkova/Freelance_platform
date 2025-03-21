
import {Link,useNavigate} from 'react-router-dom'
import { useState,useCallback } from "react";
import {  useDispatch } from "react-redux";
import { login } from "../../store/Slices/userSlicer";
import Alert from '../ReadyToUseComponents/alert'
import './LoginingComp.css'
export default function LoginingComp(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setemail] = useState('')
    const [isCorrect, setIsCorrect] = useState(true)
    const [isBlocked, setisBlocked] = useState(false)
    const [password, setpassword] = useState('')
   
    
    const handleChangeEmail = useCallback((e) => {
        setemail(e.target.value);
    });
    const handleChangePassword = useCallback((e) => {
        setpassword(e.target.value);
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(login({email,password}));
        const user = resultAction.payload.user
        if(resultAction.payload === 404){
            setIsCorrect(false)
            return
        }
        else if(user.isBlocked){
            setisBlocked(true)
            return
        }
        else{
            localStorage.setItem('token',resultAction.payload.refreshToken);
            if(resultAction.payload.user.role === 'customer'){
                navigate('/')
            }
            else if(resultAction.payload.user.role === 'freelancer'){
                navigate('/mainCandidates')
            }

          
        }
    }
    return(
        <main className="container-for-reg-log">
           {!isCorrect && (<Alert setIsCorrect={setIsCorrect} setisBlocked={setisBlocked} message='Email or password is incorrect'/>)}
           {isBlocked && (<Alert setisBlocked={setisBlocked} setIsCorrect={setIsCorrect} message='Your accont was blocked by admin'/>)}
            <section className="flex-con">
                <article className="article-for-form">
                <form action="/" onSubmit={handleSubmit} className='registration-form width logining-form'>
                    <h3>Logining</h3>
                    <div className='inputs logining-inputs'>
                        <input className='input-form' type='Email' placeholder='Entire your email' onChange={handleChangeEmail} value={email}/>
                        <input className='input-form' type='password' placeholder='Password' onChange={handleChangePassword} value={password}></input>
                    </div>
                    <input type='submit' className='reg-button' value={'Logining'}/>
                </form>
                <div className='switch'>
                    <p>switch to
                        <Link to='/registration' className='span'>
                        <span className='span'> Register</span>
                        </Link>
                    </p>
                </div>
                <img src="./images/Logining-image.png" alt="" className='img width'/>
                </article>
                
            </section>
        </main>
    )
}