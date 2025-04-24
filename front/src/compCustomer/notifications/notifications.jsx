import './notifications.css'
import Button from '../../materialuiComponents/Button'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Notifications({notify,accept,decline}){
    const dispatch = useDispatch();
    const ViewDate = (date) =>{
        const dateObject = new Date(date);
        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = dateObject.getFullYear();
        return ` ${day}.${month}.${year}
        in 
        ${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}.${dateObject.getMilliseconds()}`
      }
      const [accepted,setAccepted] = useState('')
      const handleAccept = (id) =>{
        dispatch(accept(id))
        setAccepted(true)
      }
      const handleDecline = (id) =>{
        dispatch(decline(id))
        setAccepted(false)
      }
    return(
        <article className='notification-con'>
            <div className='inf-about-user'>
                <div className='user-cart'>
                    <p className='ReadexFont font-18'>Name: {notify?.User?.login}</p>
                    <p className='ReadexFont font-18'>Email: {notify?.User?.email}</p>
                </div>
                <div className='date'>
                   <p className='date-time'>Send date: {ViewDate(notify.createdAt)}</p>
                </div>
            </div>
            <div className='desc-req'>
                <p className='ReadexFont font-18'>Description: {notify?.User?.UserInfotmation?.description.slice(0,50)}...</p>
            </div>
            <div className='task-inf'>
                <div>
                    <p className='ReadexFont fontWeight600'>{notify?.Vacancie?.title}</p>
                    <p className='ReadexFont font-18'>Salary: ${notify?.Vacancie?.salary}</p>
                    <p className='ReadexFont font-18'>Description: {notify?.Vacancie?.description.slice(0,50)}...</p>
                    <div className='skills-div'>
                        {notify?.Vacancie?.skills.split(',').map((skill) =>(
                            <div className='skill-block'>{skill}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='buttons-req'>
            {
                accepted === true || notify.isConfirmed === true ? (
                    <p className="Green">Accepted</p>
                ) : accepted === false ||  notify.isConfirmed === false ? (
                    <p className="Red">Declined</p>
                ) : (
                    <>
                    <Button
                        text="Accept"
                        backgroundColor="rgb(112, 183, 83)"
                        color="#fff"
                        width="20%"
                        func={() => handleAccept(notify.idRequest)}
                    />
                    <Button
                        text="Decline"
                        backgroundColor="rgb(196, 39, 39)"
                        color="#fff"
                        width="20%"
                        func={() => handleDecline(notify.idRequest)}
                    />
                    </>
                )
                }
                
            </div>
            
        </article>
    )
}