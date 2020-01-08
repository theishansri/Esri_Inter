const initState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    isLoading:false,
    user:null
}
export default function(state=initState,action){
    switch(action.type){
        case "USER_LOADING":
            return{
                ...state,
                isLoading:true
            }
        case "USER_LOADED":
            return{
                ...state,
                isLoading:false,
                isAuthenticated:true,
                user:action.payload
            }
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return{
                ...state,
                ...action.payload,
                isLoading:false,
                isAuthenticated:true,
            }
        case 'LOGIN_FAIL':
        case 'AUTH_ERROR':
        case 'LOGOUT_SUCCESS':
        case 'REGISTER_FAIL':
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                isLoading:false
            }
        default:
            return state
    }
}