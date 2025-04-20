import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './Slices/userSlicer.js';
import skillsReducer from './Slices/skillsSlicer'
import proposalSlicer from './Slices/proposalSlicer.js'
<<<<<<< Updated upstream
import vacancieSlicer from './Slices/vacancieSlicer.js'
=======
import portfolioSlice from './Slices/portfolioSlice.js'

>>>>>>> Stashed changes
export default configureStore({
  reducer: {
    users: usersReducer,
    skills: skillsReducer,
    proposal:proposalSlicer,
<<<<<<< Updated upstream
    vacancie:vacancieSlicer,
=======
    portfolio: portfolioSlice
>>>>>>> Stashed changes
  },
});
