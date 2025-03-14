import {configureStore} from "@reduxjs/toolkit"
import groupReducer from './Slices/groupSlicer.js'
import teamsReucer from './Slices/teamSlicer.js'
import pilotSlicer from './Slices/pilotsSlicer.js'
import newsSlice from './Slices/newsSlicer.js'
import userSlice from './Slices/userSlicer.js'
export default configureStore({
    reducer:{
        groups:groupReducer,
        teams:teamsReucer,
        pilots:pilotSlicer,
        news:newsSlice,
        users:userSlice
    }
})
