import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './Slices/userSlicer.js';
import skillsReducer from './Slices/skillsSlicer'
import proposalSlicer from './Slices/proposalSlicer.js'
import vacancieSlicer from './Slices/vacancieSlicer.js'
import portfolioSlice from './Slices/portfolioSlice.js'
export default configureStore({
  reducer: {
    users: usersReducer,
    skills: skillsReducer,
    proposal:proposalSlicer,
    vacancie:vacancieSlicer,
    portfolio: portfolioSlice
  },
});
