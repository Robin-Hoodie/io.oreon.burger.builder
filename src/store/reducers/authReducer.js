import * as actionTypes from '../actions/authActionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    redirectPath: '/'
};

const authStart = state => {
    return {
        ...state,
        error: null,
        loading: true
    };
};

const authSuccess = (state, action) => {
    return {
        ...state,
        error: null,
        loading: false,
        userId: action.payload.localId,
        token: action.payload.idToken
    }
};

const authFail = (state, action) => {
    return {
        ...state,
        error: action.payload,
        loading: false
    }
};

const authLogout = state => {
    return {
        ...state,
        token: null,
        userId: null
    }
};

const authSetRedirectPath = (state, action) => {
    return {
        ...state,
        redirectPath: action.payload
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state);
        case actionTypes.AUTH_SET_REDIRECT_PATH:
            return authSetRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;