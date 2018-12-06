import axios from '../../axios-orders';
import {
    BURGER_ADD_INGREDIENT,
    BURGER_INIT_INGREDIENTS_FAILED,
    BURGER_INIT_INGREDIENTS_LOADING,
    BURGER_INIT_INGREDIENTS_SUCCESS,
    BURGER_REMOVE_INGREDIENT
} from './burgerActionTypes';

export const burgerAddIngredient = payload => {
    return {
        type: BURGER_ADD_INGREDIENT,
        payload
    }
};

export const burgerRemoveIngredient = payload => {
    return {
        type: BURGER_REMOVE_INGREDIENT,
        payload
    }
};

export const burgerInitIngredients = () => {
    return async dispatch => {
        dispatch({
            type: BURGER_INIT_INGREDIENTS_LOADING
        });
        try {
            const response = await axios.get('/ingredients.json');
            dispatch({
                type: BURGER_INIT_INGREDIENTS_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: BURGER_INIT_INGREDIENTS_FAILED,
                payload: error
            });
        }
    };
};