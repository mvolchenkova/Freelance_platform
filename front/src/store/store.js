import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './Slices/userSlicer.js';
import skillsReducer from './Slices/skillsSlicer'
import proposalSlicer from './Slices/proposalSlicer.js'
import vacancieSlicer from './Slices/vacancieSlicer.js'
import portfolioSlice from './Slices/portfolioSlice.js'
import additionalServicesSlice from './Slices/additionalServicesSlice.js'
import requestSlice from './Slices/requestSlice.js'

export default configureStore({
  reducer: {
    users: usersReducer,
    skills: skillsReducer,
    proposal:proposalSlicer,
    vacancie:vacancieSlicer,
    portfolio: portfolioSlice,
    additionalServices: additionalServicesSlice,
    request: requestSlice
  },
});
