import * as actionTypes from '../actions/orderActionTypes';

const initialState = {
    orders: [],
    saveLoading: false,
    saveError: null,
    saveSuccess: false,
    listLoading: false,
    listError: null,
};

const orderSaveSuccess = (state, action) => {
    return {
        ...state,
        orders: [
            ...state.orders,
            action.payload
        ],
        saveLoading: false,
        saveError: null,
        saveSuccess: true
    };
};

const orderSaveLoading = state => {
    return {
        ...state,
        saveLoading: true,
        saveSuccess: false
    };
};

const orderSaveError = (state, action) => {
    return {
        ...state,
        saveLoading: false,
        saveError: action.payload,
        saveSuccess: false
    };
};

const orderListSuccess = (state, action) => {
    return {
        ...state,
        orders: action.payload,
        listLoading: false,
        listError: null
    };
};

const orderListLoading = state => {
    return {
        ...state,
        listLoading: true,
    };
};

const orderListError = (state, action) => {
    return {
        ...state,
        listLoading: false,
        listError: action.payload
    };
};

const orderSaveSuccessReset = state => {
    return {
        ...state,
        saveSuccess: false
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_SAVE_SUCCESS:
            return orderSaveSuccess(state, action);
        case actionTypes.ORDER_SAVE_LOADING:
            return orderSaveLoading(state, action);
        case actionTypes.ORDER_SAVE_ERROR:
            return orderSaveError(state, action);
        case actionTypes.ORDER_LIST_SUCCESS:
            return orderListSuccess(state, action);
        case actionTypes.ORDER_LIST_LOADING:
            return orderListLoading(state);
        case actionTypes.ORDER_LIST_ERROR:
            return orderListError(state, action);
        case actionTypes.ORDER_LIST_SUCCESS_RESET:
            return orderSaveSuccessReset(state);
        default:
            return state;
    }
};

export default reducer;