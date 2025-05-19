import './NotificationPage.css';
import Header from '../../compCustomer/Header/Header';
import Notifications from '../../compCustomer/notifications/notifications';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllUserRequests, acceptRequest, rejectRequest } from '../../store/Slices/requestSlice';
import { fetchFinesByUserId } from '../../store/Slices/fineSlice';
import AdminNotifications from '../../compAdmin/AdminNotification/AdminNotification'
import { fetchSupports,fetchSupportByUserId,deleteSupport } from '../../store/Slices/supportSlice';
import AdminSupportNotification from '../../compAdmin/AdminSupportNotification/AdminSupportNotification'
import CustSupportNotification from '../../compAdmin/CustSupportNotification/CustSupportNotification'
import AdminReportNotification from '../../compAdmin/AdminReportNotification/AdminReportNotification';
import CustReportNotification from '../../compAdmin/CustReportNotification/CustReportNotification';
import { fetchReports,fetchReportsByUserId } from '../../store/Slices/reportSlice';
import { deleteReport } from '../../store/Slices/reportSlice';

export default function NotificationPage() {
    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    const id = user?.user?.id;
    const role = user?.user?.role;
    const { supports = [] } = useSelector((state) => state.support);
    const { reports = [] } = useSelector((state) => state.report);
    const  { fines = [] }  = useSelector(state => state.fine);
    const users = useSelector((state) => state.users.users.data || []);
    const dispatch = useDispatch();

    // Загружаем запросы и штрафы
    useEffect(() => {
        if (id) {
            dispatch(fetchAllUserRequests(id));
        }
    }, [dispatch, id]);
    useEffect(() => {
        if (user?.user?.role == 'customer'||user?.user?.role == 'freelancer') {
            dispatch(fetchSupportByUserId(user.user.id));
        } else {
             dispatch(fetchSupports()); // admin
        }
        }, [dispatch, user?.id, user?.role]);
    useEffect(() => {
        if (id) {
            console.log('Fetching fines for user:', id);
            dispatch(fetchFinesByUserId(id));
        }
    }, [id, dispatch]);
    const handleDeleteReport = (idReport) => {
        dispatch(deleteReport(idReport));
    };
    const handleDeleteSupport = (idSupport) => {
        dispatch(deleteSupport(idSupport));
    };
    useEffect(() => {
        if (user?.user?.role == 'customer'||user?.user?.role == 'freelancer') {
            dispatch(fetchReportsByUserId(user.user.id));
        } else {
             dispatch(fetchReports()); // admin
        }
        }, [dispatch, user?.id, user?.role]);
    const { request, status } = useSelector((state) => state.request);
    const requestArray = Array.isArray(request)
        ? [...request].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];

    if (status === 'loading') return <p>loading</p>;

    // Проверка состояния загрузки
    // if (finesStatus === 'loading') {
    //     return <p>Loading fines...</p>;
    // }
    // if (finesStatus === 'rejected') {
    //     return <p>Error loading fines: {error}</p>;
    // }

    return (
        <>
            <Header />
            <main className="main-notification">
                <div className="notification-title">
                    <p className="ReadexFont">
                        This is your notifications
                    </p>
                </div>
                {Array.isArray(request) || request.length !== 0
                ?requestArray.map((notify) =>(
                    <Notifications key={notify.idRequest} notify={notify} accept={acceptRequest} decline={rejectRequest}/>
                )) :(
                    <div>
                        
                    </div>
                )
                }
                { fines.length !== 0
                    ? fines.map((fine) => (
                        <AdminNotifications key={fine.idFine} fine={fine} />
                    )) : (
                        <div>
                            
                        </div>
                    )
                }
                {supports.length > 0 && role=="admin"? (
                    supports.map((record) => (
                        <AdminSupportNotification key={record.idSupport} record={record} />
                    ))
                    ) : (
                    <div>
                        
                    </div>
                )}
                {supports.length > 0 && role!="admin" &&
                    supports
                        .map((record) => (
                        <CustSupportNotification key={record.idSupport} record={record} onDelete={handleDeleteSupport}/>
                    ))
                }
                {reports.length > 0 && role !== "admin" &&
                    reports
                        .filter((r) => r.Status)
                        .map((report) => (
                        <CustReportNotification
                            key={report.idReport}
                            report={report}
                            users={users}
                            onDelete={handleDeleteReport}
                        />
                    ))}
                    {reports.length > 0 && role === "admin" &&
                    reports
                        .filter((r) => !r.Status || r.Status === 'pending') // только активные
                        .map((report) => (
                        <AdminReportNotification key={report.idReport} report={report} users={users} />
                        ))
                }
            </main>
        </>
    );
}
