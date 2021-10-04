import {configureStore} from '@reduxjs/toolkit'
import { authSlice } from './auth-slice'
import { workingTableSlice } from './workingTable-slice'



 const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        workingTable: workingTableSlice.reducer
    }
})

export default store