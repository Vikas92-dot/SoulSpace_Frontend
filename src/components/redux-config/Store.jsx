import { configureStore } from "@reduxjs/toolkit";
import UserSlice from './UserSlice'
import AdminSlice from './AdminSlice'

const Store = configureStore({
    reducer:{
        User: UserSlice,
        Admin: AdminSlice
    }
})
export default Store;