import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "UserSlice",
    initialState:{
        user:{},
        token: null,
        message: "",
        isLoggedIn: false
    },
    reducers:{
        setUser: (state,action)=>{
          console.log(action.payload);
          state.message = action.payload.message;
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.isLoggedIn = true;
          delete state.user.password;
        },
        signOut: (state,action)=>{
            state.user = {};
            state.token = null;
            state.message = "";
            state.isLoggedIn = false;
        }
    }
});
export const {setUser, signOut} = slice.actions;
export default slice.reducer;