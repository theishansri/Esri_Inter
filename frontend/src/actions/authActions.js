
//check token and load user
import axios from 'axios';
import { returnError } from "./errorActions";



export const login = ({ email, password }) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ email, password })
        let x = await axios.post('http://localhost:5000/api/auth', body, config)
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: x.data
        })
    } catch (error) {
        dispatch(returnError(error.response.data, error.response.status, 'LOGIN_FAIL'))
        dispatch({
            type: "LOGIN_FAIL",
        })
    }
}
export const logout = () => {
    // localStorage.setItem('token')
    return {
        type: "LOGOUT_SUCCESS"
    }
}
export const register = ({ firstName, lastName, email, password }) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }

        }
        const body = JSON.stringify({ firstName, lastName, email, password })
        let x = await axios.post('http://localhost:5000/api/users', body, config)
        dispatch({
            type: "REGISTER_SUCCESS",
            payload: x.data
        })
    } catch (error) {
        dispatch(returnError(error.response.data, error.response.status, 'REGISTER_FAIL'))
        dispatch({
            type: "REGISTER_FAIL",
        })
    }
}

export const loadUser = () => async (dispatch, getState) => {
    //User loading
    dispatch({ type: 'USER_LOADING' });
    //Get token from local storage

    try {
        let x = await axios.get('http://localhost:5000/api/auth/user', tokenConfig(getState))
        dispatch({ type: 'USER_LOADED', payload: x.data })
    } catch (error) {
        dispatch(returnError(error.response.data, error.response.status))
        dispatch({ type: 'AUTH_ERROR' })
    }
}
export const tokenConfig = getState => {
    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}
