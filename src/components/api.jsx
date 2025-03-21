export default{
    "BASE_URL": "http://localhost:5000",
    "USER_REGISTER" :"http://localhost:5000/users/register",
    "VERIFY_OTP": "http://localhost:5000/users/verify-otp",
    "USER_LOGIN": "http://localhost:5000/users/login",
    "FORGOT_OTP": "http://localhost:5000/users/forgotOtp",
    "FORGOT_PASSWORD": "http://localhost:5000/users/forgotPassword",
    "USER_LOGOUT":"http://localhost:5000/users/logout",
    "FETCH_USER": "http://localhost:5000/users/getProfile",
    "EDIT_USER": "http://localhost:5000/users/editProfile",
    "UPLOAD_PIC": "http://localhost:5000/users/upload",

    "MEDITATION_TRACKER": "http://localhost:5000/meditation/viewProgress",
    "MEDITATION_LOG": "http://localhost:5000/meditation/log",

    "CREATE_FORUM": "http://localhost:5000/forum/createPost",
    "ALLFORUM": "http://localhost:5000/forum/AllPosts",
    "ADD_COMMENT": "http://localhost:5000/forum/comment",
    "ADD_LIKE": "http://localhost:5000/forum/like",

    "GET_JOURNALS": "http://localhost:5000/journal/fetch",
    "CREATE_JOURNAL": "http://localhost:5000/journal/create",
    "UPDATE_JOURNAL": "http://localhost:5000/journal/update",
    "DELETE_JOURNAL": "http://localhost:5000/journal/delete",

    "SET_NOTIFICATION": "http://localhost:5000/notifications/set",
    "GET_NOTIFICATION": "http://localhost:5000/notifications/get",

    // Admin Routes
    "ADMIN_LOGIN":"http://localhost:5000/admin/sign-in",
    "GET_ALLUSERS": "http://localhost:5000/admin/users",
    "GET_ALLPOSTS": "http://localhost:5000/forum/AllPosts",
    "DELETE_USER": "http://localhost:5000/admin/users",
    "DELETE_POST": "http://localhost:5000/admin/forum",

    //Contact Us Page
    "FILL_FORM": "http://localhost:5000/contact-us/fill-form",
    "GET_FEEDBACK": "http://localhost:5000/contact-us/get-feedback"
    
}