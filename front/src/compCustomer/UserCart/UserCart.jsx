import './UserCart.css';
import Button from '../../materialuiComponents/Button';
import { useDispatch, useSelector } from 'react-redux';
import BasicModal from '../../materialuiComponents/ModalUpdInf/ModalUpdInf';
import AdditionalServicesModal from '../../materialuiComponents/ModalAddServices/ModalAddServices'
import { fetchInf } from '../../store/Slices/userSlicer';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createAdditionalService } from '../../store/Slices/additionalServicesSlice';
export default function UserCart() {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('currentUser'));
  const status = useSelector((state) => state.users.status);
  const userinf = useSelector((state) => state.users.inf);
  // const userServices = useSelector((state) => state.users.services)
  const handleCreateService = ({ serviceName, description, price }) => {
    console.log("Adding service from parent...", serviceName, description, price);
    // Здесь можно сделать dispatch для добавления нового сервиса
    dispatch(createAdditionalService({ serviceName, description, price }));
  };
  useEffect(() => {
    dispatch(fetchInf());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getUserServices());
  // }, []);
  
  if (status === 'loading') {
    return <p>Loading...</p>;
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
        <div className="user-parametrs flex-row justify-between">
          <div className="user-information">
          <p className="ReadexFont parametrs">
              Nickname:
              {user.user.login}
            </p>
            <p className="ReadexFont parametrs">
              Email:
              {user.user.email}
            </p>
            <p className="ReadexFont parametrs">
              Salary: ${userinf.salary ? userinf.salary : 'empty'}/month
            </p>
            <p className="ReadexFont parametrs">
              Location: {userinf.location ? userinf.location : 'no location'}
            </p>
            <p className="ReadexFont parametrs">
              Account created: {new Date(user.user.createdAt).toLocaleDateString('ru-RU')}
            </p>
          </div>

          <div className='userCartButtons'>
            <div className="flex-column justify-between">
              <BasicModal inf={userinf} />
            </div>
            {user.user.role==='freelancer'&&(
               <div className="flex-column justify-between">
                <AdditionalServicesModal onCreateService={handleCreateService}/>
              </div>
            )

            }
           
          </div>
        </div>
        
      </div>
      <div className="user-description">
        <p>Description: {userinf.description}</p>
      </div>

      {user.user.role === 'freelancer' && (
        <div className="editPortfolioButton">
          <Link to="/portfolio">
            <Button
              text="Edit portfolio"
              backgroundColor="rgb(219, 242, 215)"
              color="#000"
              fontSize="18px"
            />
          </Link>


        </div>
      )}
       {user.user.role === 'admin' && (
        <div className="editPortfolioButton">
          <Link to="/viewUsers">
            <Button
              text="View Users"
              backgroundColor="rgb(219, 242, 215)"
              color="#000"
              fontSize="18px"
            />
          </Link>


        </div>
      )}
    </article>
  );
}
