import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "AdminSlice",
    initialState:{
        admin:{},
        message: "",
        isLoggedIn: false
    },
    reducers:{
        setAdmin: (state,action)=>{
          console.log(action.payload);
          state.message = action.payload.message;
          state.admin = action.payload.admin;
          state.isLoggedIn = true;
          delete state.admin.password;
        },
        signOutAdmin: (state,action)=>{
            state.admin = {};
            state.message = "";
            state.isLoggedIn = false;
        }
    }
});
export const {setAdmin,signOutAdmin} = slice.actions;
export default slice.reducer;