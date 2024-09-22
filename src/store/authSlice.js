import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false,
    userData: null,
    loading:true
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status = true ;
            state.userData = action.payload.userData ;
        },
        logout(state){
            state.status = false ;
            state.userData = null ;
        },
        startLoading(state){
            state.loading = true ;
        },
        stopLoading(state){
            state.loading = false ;
        },
    }
});

export const {login,logout,startLoading,stopLoading} = authSlice.actions ;
export default authSlice.reducer ;
