import {
    ORDER_SAVE_SUCCESS,
    ORDER_SAVE_ERROR,
    ORDER_SAVE_LOADING,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_LOADING,
    ORDER_LIST_ERROR,
    ORDER_LIST_SUCCESS_RESET
} from './orderActionTypes';
import axios from '../../axios-orders';

export const addOrder = order => {
    return async dispatch => {
        dispatch({
            type: ORDER_SAVE_LOADING
        });
        try {
            const response = await axios.post('/orders.json', order);
            dispatch({
                type: ORDER_SAVE_SUCCESS,
                payload: {
                    id: response.data.name,
                    data: order
                }
            });
        } catch (error) {
            dispatch({
                type: ORDER_SAVE_ERROR,
                payload: error
            });
        }
    }
};

export const fetchOrders = () => {
    return async dispatch => {
        dispatch({
            type: ORDER_LIST_LOADING
        });
        try {
            const response = await axios.get('/orders.json');
            const orders = Object.entries(response.data)
                .map(entry => {
                    return {
                        id: entry[0],
                        data: entry[1]
                    }
                });
            dispatch({
                type: ORDER_LIST_SUCCESS,
                payload: orders
            });
        } catch (error) {
            dispatch({
                type: ORDER_LIST_ERROR,
                payload: error
            });
        }
    }
};

export const resetSaveSuccess = () => {
    return {
        type: ORDER_LIST_SUCCESS_RESET
    }
};