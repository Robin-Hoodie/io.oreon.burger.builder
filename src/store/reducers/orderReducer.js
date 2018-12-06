import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    addLoading: false,
    addError: null,
    addSuccess: false,
    fetchLoading: false,
    fetchError: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_ADD_SUCCESS:
            return {
                ...state,
                orders: [
                    ...state.orders,
                    action.payload
                ],
                addLoading: false,
                addError: null,
                addSuccess: true
            };
        case actionTypes.ORDER_ADD_LOADING:
            return {
                ...state,
                addLoading: true,
                addSuccess: false
            };
        case actionTypes.ORDER_ADD_ERROR:
            return {
                ...state,
                addLoading: false,
                addError: action.payload,
                addSuccess: false
            };
        case actionTypes.ORDER_FETCH_SUCCESS:
            return {
                ...state,
                orders: action.payload,
                fetchLoading: false,
                fetchError: null
            };
        case actionTypes.ORDER_FETCH_LOADING:
            return {
                ...state,
                fetchLoading: true,
                fetchError: action.payload
            };
        case actionTypes.ORDER_FETCH_ERROR:
            return {
                ...state,
                fetchLoading: false,
                fetchError: action.payload
            };
        case actionTypes.ORDER_ADD_SUCCESS_RESET:
            return {
                ...state,
                addSuccess: false
            };
        default:
            return state;
    }
};

export default reducer;