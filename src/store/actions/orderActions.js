import {
    ORDER_ADD_SUCCESS,
    ORDER_ADD_ERROR,
    ORDER_ADD_LOADING,
    ORDER_FETCH_SUCCESS,
    ORDER_FETCH_LOADING,
    ORDER_FETCH_ERROR, ORDER_ADD_SUCCESS_RESET
} from './actionTypes';
import axios from '../../axios-orders';

export const addOrder = order => {
    return async dispatch => {
        dispatch({
            type: ORDER_ADD_LOADING
        });
        try {
            const response = await axios.post('/orders.json', order);
            dispatch({
                type: ORDER_ADD_SUCCESS,
                payload: {
                    id: response.data.name,
                    data: order
                }
            });
        } catch (error) {
            dispatch({
                type: ORDER_ADD_ERROR,
                payload: error
            });
        }
    }
};

export const fetchOrders = () => {
    return async dispatch => {
        dispatch({
            type: ORDER_FETCH_LOADING
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
                type: ORDER_FETCH_SUCCESS,
                payload: orders
            });
        } catch (error) {
            dispatch({
                type: ORDER_FETCH_ERROR,
                payload: error
            });
        }
    }
};

export const resetAddOrderSuccess = () => {
    return {
        type: ORDER_ADD_SUCCESS_RESET
    }
};