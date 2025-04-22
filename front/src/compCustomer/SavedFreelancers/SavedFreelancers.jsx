import './SavedFreelancers.css';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import {removeSavedFreelancer,deleteUser,SaveUser, getSavedUsers} from '../../store/Slices/userSlicer';
import { useDispatch, useSelector} from 'react-redux';
import Button from '../../materialuiComponents/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function SavedFreelancers() {
  const {savedUsers,status} = useSelector((state) => state.users)
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const { role } = user.user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
      dispatch(getSavedUsers())
  },[dispatch])
  console.log(savedUsers)
  const toggleFavorite = (candidate) => {
    try {
      const isFavorite = savedUsers.some((user) => user.idUser === candidate.idUser);

       if (isFavorite) {
          dispatch(deleteUser(candidate.idUser));
          dispatch(removeSavedFreelancer(candidate.idUser));
        } else {
          dispatch(SaveUser(candidate.idUser));
        }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  const ViewDate = (date) =>{
    const dateObject = new Date(date);
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();
    return ` ${day}.${month}.${year}`
  }
  if(status ==='loading') return <p>loading</p>

  return (
    <div className="saved-candidates flex-column align-center">
      {savedUsers.length ? (
        <>
        <div className='carts'>
        {savedUsers.slice(0, 2).map((candidate) => (
          <article className="candidate-cart saved">
            
              <div className="candidate-div" key={candidate.idSavedUser}>
              <div className="header-cart">
                <Stack direction="row" spacing={2}>
                  <Avatar alt={candidate?.SavedUser?.login} src="/static/images/avatar/1.jpg" sizes={'72'} />
                </Stack>
                <div className="additional-buttons">
                  <IconButton
                    style={{ paddingRight: '5px' }}
                    aria-label="add to favorites"
                    onClick={() => toggleFavorite(candidate)}
                  >
                    {savedUsers.some((user) => user.idUser === candidate.idUser) ? (
                      <FavoriteIcon style={{ color: 'red' }} />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                </div>
              </div>
              <div className="candidate-inf">
                <div className="candidate-name">
                  <p className="ReadexFont">
                    {candidate?.SavedUser?.login}
                  </p>
                  <p className="ReadexFont ">{ViewDate(candidate?.SavedUser?.createdAt)}</p>
                </div>
                <div className="location-payment">
                  <div className="flex-row align-center">
                    <img src="./images/location.png" alt="" />
                    <p className="ReadexFont ">{candidate?.SavedUser?.UserInformation?.location
                      ? candidate?.SavedUser?.UserInformation?.location
                      : 'Not selected'}
                    </p>
                  </div>
                  <div className="flex-row align-center">
                    <img src="./images/dollar-circle.png" alt="" />
                    <p className="ReadexFont ">
                      <span className={` ${candidate?.SavedUser?.UserInformation?.salary? 'fontWeight600 black' : ''} `}>
                        {candidate?.SavedUser?.UserInformation?.salary
                         ? `$${candidate?.SavedUser?.UserInformation?.salary}/Month`
                         : 'Ask for user'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-row align-center justify-between">
                <p className="ReadexFont">
                  {candidate?.SavedUser?.UserInformation?.description?.slice(0, 50)}...
                </p>
              </div>
              <div className="flex-row align-center justify-between">
                <Button text="Send message" backgroundColor="#4FCB94" color="white" width="48%" />
                <Button
                  text="Detail Information"
                  backgroundColor="#F3F3F3"
                  color="#7F879E"
                  width="48%"
                />
              </div>
            </div>
        
          </article>
              ))}
         
        </div>
         <Button
         className="ReadexFont"
         text="Find a freelancer"
         func = {() =>navigate('/findFreelancers')}
         backgroundColor="rgb(61,66,90)"
         color="rgb(255,255,255)"
         fontSize="16px"
         width="200px"
       />
       </>
      ) : (
        <p className="ReadexFont uppercase message-saved">
          You dont save any {role === 'customer' ? 'freelacer' : 'customer'}{' '}
        </p>
      )}
    </div>
  );
}
