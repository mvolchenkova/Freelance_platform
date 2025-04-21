import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFreelancers,
  selectFilteredFreelancers,
  selectFreelancerLoading,
  selectFreelancerError,
} from '../../store/Slices/freelancerSlicer';
import {
  setSavedFreelancer,
  removeSavedFreelancer,
} from '../../store/Slices/userSlicer';
import { selectPortfolioByUserId, selectPortfolioLoading } from '../../store/Slices/portfolioSlice';
import { getByUserId } from '../../store/Slices/portfolioSlice'; 
// Material-UI компоненты
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '../../materialuiComponents/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

// Стили
import './Vacancies.css';

const FreelancerCard = React.memo(({ freelancer, isFavorite, onToggleFavorite }) => {
  const dispatch = useDispatch();
  const portfolio = useSelector(state => selectPortfolioByUserId(state, freelancer.idUser));
  const portfolioLoading = useSelector(selectPortfolioLoading);

  useEffect(() => {
    if (!portfolio) {
      dispatch(getByUserId(freelancer.idUser)); // Dispatch the thunk
    }
  }, [dispatch, freelancer.idUser, portfolio]);


  return (
    <article className='candidate-cart'>
      <div className='candidate-div'>
        <div className='header-cart'>
          <Stack direction="row" spacing={2}>
            <Avatar 
              alt={freelancer.name} 
              src={freelancer.avatarUrl || "/static/images/avatar/1.jpg"} 
              sx={{ width: 72, height: 72 }}
            />
          </Stack>
          <div className='additional-buttons'>
            <IconButton 
              aria-label="add to favorites"
              onClick={() => onToggleFavorite(freelancer)}
              color={isFavorite ? 'error' : 'default'}
            > 
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorder />}
            </IconButton>
          </div>
        </div>
        <div className='candidate-inf'>
          <div className='candidate-name'>
            <p className='ReadexFont gray'>{freelancer.name}, {freelancer.age || 30} y.o.</p>
            <p className='ReadexFont gray'>{freelancer.RegisterDate}</p>
          </div>
          <p className='ReadexFont fontWeight600'>{freelancer.Profession || 'Freelancer'}</p>
          
          {/* Блок с опытом работы и образованием */}
          {portfolioLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress size={24} />
        </Box>
      ) : portfolio ? ( // Check if portfolio is defined
        <div className='experience-education'>
          <div className='flex-row align-center'>
            <p className='ReadexFont gray'>
              Experience: <span className='fontWeight600 black'>
                {portfolio.workExperience || 0} years {/* Optional chaining is not needed here anymore */}
              </span>
            </p>
          </div>

          <div className='flex-row align-center' style={{ marginTop: 8 }}>
            <p className='ReadexFont gray'>
              Education: <span className='fontWeight600 black'>
                {portfolio.education || 'Not specified'}
              </span>
            </p>
          </div>
        </div>
      ) : null} {/* Render nothing if portfolio is still undefined after loading */}
          
          <div className='location-payment'>
            <div className='flex-row align-center'>
              <img src="./images/location.png" alt="location" />
              <p className='ReadexFont gray'>{freelancer.location || 'Remote'}</p>
            </div>
            <div className='flex-row align-center'>
              <img src="./images/dollar-circle.png" alt="payment" />
              <p className='ReadexFont gray'>
                <span className='fontWeight600 black'>${freelancer.payment}</span>/Month
              </p>
            </div>
          </div>
          
          <p className='ReadexFont gray'>{freelancer.smallDesc}</p>
        </div>
        <div className='flex-row align-center justify-between'>
          {(freelancer.skills || []).map((skill, index) => (
            <div key={index} className='skill'>
              <p className='ReadexFont gray'>{skill}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='flex-row align-center justify-between'>
        <Button 
          text='Send message' 
          backgroundColor="#4FCB94" 
          color='white' 
          width="48%"
          onClick={() => console.log('Message to', freelancer.id)}
        />
        <Button 
          text='Detail Information' 
          backgroundColor="#F3F3F3" 
          color='#7F879E' 
          width="48%"
          onClick={() => console.log('Details', freelancer.id)}
        />
      </div>
    </article>
  );
});

export default function Vacancies() {
  const dispatch = useDispatch();
  
  // Получаем данные из Redux store
  const {
    freelancers = [],
    loading,
    error
  } = useSelector(state => ({
    freelancers: selectFilteredFreelancers(state),
    loading: selectFreelancerLoading(state),
    error: selectFreelancerError(state)
  }));
  
  // Получаем сохраненных фрилансеров
  const savedFreelancers = useSelector(state => state.users.savedUsers || []);

  // Загрузка данных при монтировании
  useEffect(() => {
    dispatch(fetchFreelancers());
  }, [dispatch]);

  // Обработчик для избранного
  const toggleFavorite = useCallback((freelancer) => {
    const isFavorite = savedFreelancers.some(f => f.id === freelancer.id);
    dispatch(isFavorite ? 
      removeSavedFreelancer(freelancer.id) : 
      setSavedFreelancer(freelancer)
    );
  }, [dispatch, savedFreelancers]);

  // Состояния загрузки и ошибки
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ margin: 2 }}>
        Error loading freelancers: {error}
      </Alert>
    );
  }

  if (!freelancers.length) {
    return (
      <Alert severity="info" sx={{ margin: 2 }}>
        No freelancers found matching your criteria
      </Alert>
    );
  }

  return (
    <main className='main-vacancies'>
      <div className="sortDiv">
        <div>
          <p>Recommendation</p>
          <p>{freelancers.length} freelancers available</p>
        </div>
        <div>
          <p>Sort by:</p>
          {/* Здесь можно добавить компонент сортировки */}
        </div>
      </div>
      
      <div className='carts'>
        {freelancers.map(freelancer => (
          <FreelancerCard
            key={freelancer.id}
            freelancer={freelancer}
            isFavorite={savedFreelancers.some(f => f.id === freelancer.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </main>
  );
}