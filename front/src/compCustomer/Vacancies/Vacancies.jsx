import './Vacancies.css';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '../../materialuiComponents/Button';
import ModalFreelancerDetails from '../../materialuiComponents/ModalFreelancerDetails/ModalFreelancerDetails'
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { removeSavedFreelancer, getUserByRole, deleteUser, SaveUser, getSavedUsers } from '../../store/Slices/userSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


export default function Vacancies() {
  const dispatch = useDispatch();
  const {users,status} = useSelector((state)=>state.users);

  
  useEffect(()=>{
    dispatch(getUserByRole({role:"freelancer"}));
  },[dispatch])
  
  useEffect(()=>{
    dispatch(getSavedUsers())
  },[dispatch])
  const savedCandidates = useSelector((state) => state.users.savedUsers);
  const toggleFavorite = (candidate) => {
    try {
      const isFavorite = savedCandidates.some((user) => user.idUser === candidate.idUser);

      if (isFavorite) {
        dispatch(removeSavedFreelancer(candidate.idUser));
        dispatch(deleteUser(candidate.idUser));
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

  if(status ==='loading') return <p>Loading...</p>

  return (
    <main className="main-vacancies">
      <div className="sortDiv">
        <div>
          <p>Recomendation</p>
          <p>38 product designer Jobs in United States</p>
        </div>
        <div>
          <p>Sort by:</p>
        </div>
      </div>
      <div className="carts">
      {users.map((candidate) =>(
        <article className="candidate-cart">
          
            <div className="candidate-div" key={candidate.idUser}>
              <div className="header-cart">
                <Stack direction="row" spacing={2}>
                  <Avatar alt={candidate.login} src="/static/images/avatar/1.jpg" sizes={'72'} />
                </Stack>
                <div className="additional-buttons">
                  <IconButton
                    style={{ paddingRight: '5px' }}
                    aria-label="add to favorites"
                    onClick={() => toggleFavorite(candidate)}
                  >
                    {savedCandidates.some((user) => user.idUser === candidate.idUser) ? (
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
                    {candidate.login}
                  </p>
                  <p className="ReadexFont gray">{ViewDate(candidate.createdAt)}</p>
                </div>
                <div className="location-payment">
                  <div className="flex-row align-center">
                    <img src="./images/location.png" alt="" />
                    <p className="ReadexFont gray">{candidate.UserInformation.location
                      ? candidate.UserInformation.location
                      : 'Not selected'}
                    </p>
                  </div>
                  <div className="flex-row align-center">
                    <img src="./images/dollar-circle.png" alt="" />
                    <p className="ReadexFont gray">
                      <span className={` ${candidate.payment? 'fontWeight600 black' : ''} `}>
                        {candidate.UserInformation.salary
                         ? `$${candidate.UserInformation.salary}/Month`
                         : 'Ask for user'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-row align-center justify-between">
                <p className="ReadexFont gray">
                  {candidate.UserInformation.description?.slice(0, 50)}...
                </p>
              </div>
              <div className="flex-row align-center justify-between">
                <Button text="Send message" backgroundColor="#4FCB94" color="white" width="48%" />
                <ModalFreelancerDetails candidate={candidate}/>
              </div>
            </div>
        </article>
      ))}
      </div>
    </main>
  );
}
