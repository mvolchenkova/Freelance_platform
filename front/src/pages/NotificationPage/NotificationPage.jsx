import './NotificationPage.css'
import Header from '../../compCustomer/Header/Header'
import Notifications from '../../compCustomer/notifications/notifications'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllUserRequests,acceptRequest, rejectRequest } from '../../store/Slices/requestSlice';
export default function NotificationPage(){
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const id = user.user.id
    const role = user.user.role
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchAllUserRequests(id))
    },[dispatch,id])
    const {request,status} = useSelector((state) => state.request)
    const requestArray = Array.isArray(request)
        ? [...request].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];
    if(status ==='loading') return <p>loading</p>
    return(
        <>
            <Header/>
            <main className='main-notification'>
                <div className='notification-title'>
                    <p className='ReadexFont '>This is your notifications from {role ==='customer'
                        ? 'freelancers'
                        : 'customers'}
                    </p>
                </div>
                {Array.isArray(request) || request.length !== 0
                ?requestArray.map((notify) =>(
                    <Notifications key={notify.idRequest} notify={notify} accept={acceptRequest} decline={rejectRequest}/>
                )) :(
                    <div className='notification-title'>
                        <p className='ReqdexFont'>There is no request</p>
                    </div>
                )
                }
                
               
            </main>
        </>
    )
}