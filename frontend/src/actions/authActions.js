
//check token and load user
import axios from 'axios';
import { returnError } from "./errorActions"

export const loadUser = () => async (dispatch, getState) => {
    //User loading
    dispatch({ type: 'USER_LOADING' });
    //Get token from local storage
   
    try {
        let x = await axios.get('/api/auth/user', tokenConfig(getState))
        dispatch({ type: 'USER_LOADED', payload: x.data })
    } catch (error) {
        dispatch(returnError("Not Authenticated", error.response.status))
        dispatch({ type: 'AUTH_ERROR' })
    }
}
export const tokenConfig=getState=>{
    const token = getState().auth.token;
const config = {
    headers: {
        'Content-type': 'application/json'
    }
}
if (token) {
    config.headers['x-auth-token'] = token;
}
return config;
}
