import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVacancies } from '../../store/Slices/vacancieSlicer';
import { setSavedFreelancer, removeSavedFreelancer } from '../../store/Slices/userSlicer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Button from '../../materialuiComponents/Button';
import './FreelancerVacancies.css';
import {sendRequest} from '../../store/Slices/requestSlice'

export default function Vacancies() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVacancies());
  }, [dispatch]);

  const vacancies = useSelector((state) => state.vacancie.allVacanie?.data) || [];
  const savedVacancies = useSelector((state) => state.users.savedUsers) || [];

  const toggleFavorite = (candidate) => {
    const isFavorite = savedVacancies.some((user) => user.id === candidate.id);
    if (isFavorite) {
      dispatch(removeSavedFreelancer(candidate.id));
    } else {
      dispatch(setSavedFreelancer(candidate));
    }
  };

  const handleSendRequest = (id) => {
    dispatch(sendRequest(id))
  }
  return (
    <main className="main-vacancies">
      <div className="sortDiv">
        <div>
          <p>Recommendation</p>
          <p>{vacancies.length} vacancies for designers</p>
        </div>
        <div>
          <p>Order by:</p>
        </div>
      </div>

      <div className="carts">
        {vacancies.map((vacancy) => (
          <article key={vacancy.id} className="candidate-cart">
            <div className="candidate-div">
              <div className="header-cart">
                <IconButton
                  style={{ paddingRight: '5px' }}
                  aria-label="add to favorites"
                  onClick={() => toggleFavorite(vacancy)}
                >
                  {savedVacancies.some((user) => user.id === vacancy.id) ? (
                    <FavoriteIcon style={{ color: 'red' }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </div>

              <div className="candidate-inf">
                <div className="candidate-name">
                  <p className="ReadexFont gray">
                    {vacancy.title}, {vacancy.description}
                  </p>
                </div>

                <div className="location-payment">
                  <div className="flex-row align-center">
                    <img src="./images/dollar-circle.png" alt="" />
                    <p className="ReadexFont gray">
                      <span className="fontWeight600 black">{vacancy.salary}</span>
                      /month
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-row align-center justify-between">
                {vacancy.skills?.map((skill, index) => (
                  <div key={index} className="skill">
                    <p className="ReadexFont gray">{skill}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-row align-center justify-between">
              <Button text="Send request" backgroundColor="#4FCB94" color="white" width="48%"
              func={() => handleSendRequest(vacancy.UserIdUser)} />
              <Button text="Details" backgroundColor="#F3F3F3" color="#7F879E" width="48%" />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
