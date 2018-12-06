import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const burgerAddIngredient = payload => {
    return {
        type: actionTypes.BURGER_ADD_INGREDIENT,
        payload
    }
};

export const burgerRemoveIngredient = payload => {
    return {
        type: actionTypes.BURGER_REMOVE_INGREDIENT,
        payload
    }
};

export const burgerInitIngredients = () => {
    return async dispatch => {
        dispatch({
            type: actionTypes.BURGER_FETCH_INGREDIENTS_LOADING
        });
        try {
            const response = await axios.get('/ingredients.json');
            dispatch({
                type: actionTypes.BURGER_FETCH_INGREDIENTS_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: actionTypes.BURGER_FETCH_INGREDIENTS_FAILED,
                payload: error
            });
        }
    };
};