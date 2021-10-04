import {createSlice} from '@reduxjs/toolkit'

const initialToken = localStorage.getItem("token")
const initialLocalId = localStorage.getItem("localId")


export const authSlice = createSlice({
    name:"auth",
    initialState:{
        token : initialToken,
        localId : initialLocalId
    },
    reducers:{
        login(state, action){
            state.token = action.payload
            localStorage.setItem("token", action.payload)
     
        },
        logout(state){
            state.token = null
            state.localId =  null
     localStorage.removeItem("token")
     localStorage.removeItem("localId")
        },
        localIdIn(state, action){
            state.localId =  action.payload
            localStorage.setItem("localId", action.payload)
        }
    }
})

export const authActions = authSlice.actions