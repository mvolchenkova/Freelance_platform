import './SideBar.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/Slices/userSlicer';
import sideBarImage from '../../images/sidebarIcon.png'
export default function SideBar() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('currentUser')) || null;
  useEffect(() => {
    const sidebar = document.querySelector('.sideBar');
    const { body } = document;

    const handleMouseEnter = () => body.classList.add('sidebar-hover');
    const handleMouseLeave = () => body.classList.remove('sidebar-hover');

    sidebar.addEventListener('mouseenter', handleMouseEnter);
    sidebar.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      sidebar.removeEventListener('mouseenter', handleMouseEnter);
      sidebar.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [user]);

  const getLogout = () => {
    dispatch(logout());
    window.location.replace('/');
    localStorage.removeItem('currentUser');
  };
  return (
    <div className={` sideBar  flex-column justify-between align-center`}>
      <img src={sideBarImage} alt="asdasd" className='OpenButton'/>
      <div
        className={`sideBar-links flex-column align-center`}
      >
        <p className="ReadexFont">{user ? user.user.login : ''}</p>
        <Link to="/profile" className={`${!user ? 'disable' : ''} icons-link`}>
          <img src="./images/profileIcon.png" alt="" />
          <p>Profile</p>
        </Link>
        <Link to="/notification" className={`${!user ? 'disable' : ''} icons-link`}>
          <img src="./images/notification.svg" alt="" />
          <p>Notifications</p>
        </Link>
        <Link to="/profile" className={`${!user ? 'disable' : ''} icons-link`}>
          <img src="./images/ChatIcon.png" alt="" />
          <p>Chat</p>
        </Link>
      
     
          <Link to="/userVacancie" className={`${!user ? 'disable' : ''} icons-link`}>
            <img src="./images/VacancieIcon.png" alt="" />
            <p>Vacancie</p>
          </Link>
          <Link to="/userProposal" className={`${!user ? 'disable' : ''} icons-link`}>
            <img src="./images/JobIcon.png" alt="" />
            <p>Proposal</p>
          </Link>
       
      </div>
      {user ? (
        <button className={`icons-link`} onClick={() => getLogout()}>
          <img src="./images/ExitIcon.png" alt="" />
          <p>Exit</p>
        </button>
      ) : (
        <div className="icons-link">
          <img src="/images/LoginIcon.png" alt="" />
          <Link to="/login" className="ReadexFont">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
