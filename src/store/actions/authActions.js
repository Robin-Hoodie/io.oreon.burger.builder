import axios from '../../axios-auth';
import {AUTH_FAIL, AUTH_LOGOUT, AUTH_SET_REDIRECT_PATH, AUTH_START, AUTH_SUCCESS} from './authActionTypes';
import { FIREBASE_API_KEY } from '../../shared/firebase';

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: AUTH_LOGOUT
    }
};

export const checkAuthTimeout = expirationTime => {
    return async dispatch => {
        setTimeout(() => {
            dispatch({
                type: AUTH_LOGOUT
            });
        }, expirationTime * 1000);
    }
};

const expirationDate = expiresIn => {
    return new Date(new Date().getTime() + (expiresIn * 1000));
};

export const auth = (email, password, isSignUp = true) => {
    return async dispatch => {
        dispatch({
            type: AUTH_START
        });
        try {
            let url;
            if (isSignUp) {
                url = `signupNewUser?key=${FIREBASE_API_KEY}`;
            } else {
                url = `verifyPassword?key=${FIREBASE_API_KEY}`;
            }
            const response = await axios.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate(response.data.expiresIn));
            localStorage.setItem('userId', response.data.email);
            dispatch({
                type: AUTH_SUCCESS,
                payload: response.data
            });
            dispatch(checkAuthTimeout(response.data.expiresIn));
        } catch (error) {
            dispatch({
                type: AUTH_FAIL,
                payload: error.response.data.error
            });
        }
    }
};

export const setAuthRedirectPath = payload => {
    return {
        type: AUTH_SET_REDIRECT_PATH,
        payload
    }
};

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch({
                    type: AUTH_SUCCESS,
                    payload: {
                        idToken: token,
                        localId: userId
                    }
                });
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout());
            }
        }
    }
};
