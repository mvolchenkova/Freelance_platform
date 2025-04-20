import './UserCart.css';
import Button from '../../materialuiComponents/Button';
import { useDispatch, useSelector } from 'react-redux';
import BasicModal from '../../materialuiComponents/ModalUpdInf/ModalUpdInf';
import { fetchInf } from '../../store/Slices/userSlicer';
import { useEffect } from 'react';
export default function UserCart() {
  const dispatch = useDispatch()
  
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const  status  = useSelector((state) => state.users.status);
  const userinf = useSelector((state) => state.users.inf);
  // const { skills } = user.user;
  useEffect(()=>{
      dispatch(fetchInf());
  },[dispatch])
  if (status === 'loading') {
    return <p>loading</p>;
  }

  return (
    <article className="user-cart flex-column align-center">
      <div className="main-cart flex-row align-center">
        <div className="con-img">
          <div className="user-img">
            <img
              src={user && user.img ? user.img : './images/unauthorazedUser.avif'}
              alt="User-avatar"
            />
          </div>
        </div>
        <div className="user-parametrs flex-row  justify-between">
          <div className="user-information">
            <p className="ReadexFont parametrs">
              Nickname: {user.user.login}
            </p>
            <p className="ReadexFont parametrs">
              Email: {user.user.email}
            </p>
            <p className="ReadexFont parametrs">
              Salary: {userinf.salary ? (`${userinf.salary}$/month`) : 'Empty'}
            </p>
            <p className="ReadexFont parametrs">
              Location: {userinf.location ? userinf.location : 'No location'}
            </p>
            <p className="ReadexFont parametrs">
              Account created: {new Date(user.user.createdAt).toLocaleDateString('ru-RU')}
            </p>
          </div>
          
          <div className="flex-column justify-between align-center">
            <BasicModal inf={userinf}/>
          </div>
        </div>
      </div>
      <div className="user-description">
        <p className="ReadexFont description-text parametrs">
          Description: {userinf.description ? userinf.description : 'Empty'}
        </p>
      </div>
      {
          user.user.role ==='freelancer'?
          <div className='editPortfolioButton'>
            <Button
            text="Edit portfolio"
            backgroundColor="rgb(219, 242, 215)"
            color="#000"
            fontSize="18px"
            />
            
          </div>
          :<></>
        }
      
      {/* {user.user.role === 'freelancer' ? (
        <div className="skills">
          {skills.map((skill) => (
            <div key={skill.id} id="">
              {skill}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )} */}
    </article>
  );
}
