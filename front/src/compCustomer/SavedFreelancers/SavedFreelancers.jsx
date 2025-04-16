import './SavedFreelancers.css';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { setSavedFreelancer, removeSavedFreelancer } from '../../store/Slices/userSlicer';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../materialuiComponents/Button';

export default function SavedFreelancers() {
  const savedCandidates = useSelector((state) => state.users.savedUsers) || [];
  console.log(savedCandidates);
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const { role } = user.user;
  const dispatch = useDispatch();
  const toggleFavorite = (candidate) => {
    try {
      const isFavorite = savedCandidates.some((user) => user.id === candidate.id);

      if (isFavorite) {
        dispatch(removeSavedFreelancer(candidate.id));
      } else {
        dispatch(setSavedFreelancer(candidate));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  return (
    <div className="saved-candidates flex-column align-center">
      {savedCandidates.length ? (
        <>
          <article className="candidate-cart saved">
            {savedCandidates.slice(0, 2).map((user) => (
              <div className="candidate-div" id={user.id} key={user.id}>
                <div className="header-cart">
                  <Stack direction="row" spacing={2}>
                    <Avatar alt={user.name} src="/static/images/avatar/1.jpg" sizes={72} />
                  </Stack>
                  <div className="additional-buttons">
                    <IconButton
                      style={{ paddingRight: '5px' }}
                      aria-label="add to favorites"
                      onClick={() => toggleFavorite(user)}
                    >
                      {savedCandidates.some((users) => users.id === user.id) ? (
                        <FavoriteIcon style={{ color: 'red' }} />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                  </div>
                </div>
                <div className="candidate-inf">
                  <div className="candidate-name">
                    <p className="ReadexFont gray">
                      {user.name},{user.age} y.o.
                    </p>
                    <p className="ReadexFont gray">{user.RegisterDate}</p>
                  </div>
                  <p className="ReadexFont fontWeight600">{user.Profession}</p>
                  <div className="location-payment">
                    <div className="flex-row align-center">
                      <img src="./images/location.png" alt="" />
                      <p className="ReadexFont gray">{user.location}</p>
                    </div>
                    <div className="flex-row align-center">
                      <img src="./images/dollar-circle.png" alt="" />
                      <p className="ReadexFont gray">
                        <span className="fontWeight600 black">${user.payment}</span>
                        /Month
                      </p>
                    </div>
                  </div>
                  <p className="ReadexFont gray">{user.smallDesc}</p>
                </div>
                <div className="flex-row align-center justify-between">
                  {user.skills.map((elem) => (
                    <div key={elem.id} className="skill">
                      <p className="ReadexFont gray">{elem}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </article>
          <Button
            className="ReadexFont"
            text="Find a job"
            backgroundColor="rgb(61,66,90)"
            color="rgb(255,255,255)"
            fontSize="16px"
            width="200px"
          />
        </>
      ) : (
        <p className="ReadexFont uppercase message-saved">
          You dont save any {role == 'customer' ? 'freelacer' : 'customer'}{' '}
        </p>
      )}
    </div>
  );
}
