import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './Slices/userSlicer.js';
import skillsReducer from './Slices/skillsSlicer'
import proposalSlicer from './Slices/proposalSlicer.js'
import vacancieSlicer from './Slices/vacancieSlicer.js'
import portfolioSlice from './Slices/portfolioSlice.js'
import categoryReducer from './Slices/categorySlicer.js'
import freelancerReducer from './Slices/freelancerSlicer';
export default configureStore({
  reducer: {
    users: usersReducer,
    skills: skillsReducer,
    proposal:proposalSlicer,
    vacancie:vacancieSlicer,
    categories:categoryReducer,
    freelancers: freelancerReducer,
    portfolio: portfolioSlice
  },
});
