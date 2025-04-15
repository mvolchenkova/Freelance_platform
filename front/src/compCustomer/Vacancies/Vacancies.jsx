import '../Vacancies/Vacancies.css';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '../../materialuiComponents/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { setSavedFreelancer, removeSavedFreelancer } from '../../store/Slices/userSlicer';
import { useDispatch, useSelector } from 'react-redux';
export default function Vacancies() {
  const candidates = {
    id: 1,
    name: 'Syeda Johnston',
    age: 22,
    RegisterDate: '2y 6m',
    Profession: 'Product UX Designer',
    location: 'California, USA',
    payment: '100,000',
    smallDesc: 'Part-time. 2.6 years experience. Higher education',
    skills: ['Part-time', 'UI Design', 'Designer', 'Remote'],
  };
  const dispatch = useDispatch();
  const savedCandidates = useSelector((state) => state.users.savedUsers) || [];
  console.log(savedCandidates);
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
        <article className="candidate-cart">
          <div className="candidate-div">
            <div className="header-cart">
              <Stack direction="row" spacing={2}>
                <Avatar alt={candidates.name} src="/static/images/avatar/1.jpg" sizes={72} />
              </Stack>
              <div className="additional-buttons">
                <IconButton
                  style={{ paddingRight: '5px' }}
                  aria-label="add to favorites"
                  onClick={() => toggleFavorite(candidates)}
                >
                  {savedCandidates.some((user) => user.id === candidates.id) ? (
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
                  {candidates.name}, {candidates.age} y.o.
                </p>
                <p className="ReadexFont gray">{candidates.RegisterDate}</p>
              </div>
              <p className="ReadexFont fontWeight600">{candidates.Profession}</p>
              <div className="location-payment">
                <div className="flex-row align-center">
                  <img src="./images/location.png" alt="" />
                  <p className="ReadexFont gray">{candidates.location}</p>
                </div>
                <div className="flex-row align-center">
                  <img src="./images/dollar-circle.png" alt="" />
                  <p className="ReadexFont gray">
                    <span className="fontWeight600 black">${candidates.payment}</span>
                    /Month
                  </p>
                </div>
              </div>
              <p className="ReadexFont gray">{candidates.smallDesc}</p>
            </div>
            <div className="flex-row align-center justify-between">
              {candidates.skills.map((elem) => (
                <div key={elem.id} className="skill">
                  <p className="ReadexFont gray">{elem}</p>
                </div>
              ))}
            </div>
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
        </article>
      </div>
    </main>
  );
}
