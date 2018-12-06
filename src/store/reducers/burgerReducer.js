import {
    BURGER_ADD_INGREDIENT,
    BURGER_INIT_INGREDIENTS_FAILED,
    BURGER_INIT_INGREDIENTS_LOADING,
    BURGER_INIT_INGREDIENTS_SUCCESS,
    BURGER_REMOVE_INGREDIENT
} from '../actions/burgerActionTypes';

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    error: null,
    loading: false
};

const calculateTotalPrice = (ingredients) => {
    return Object.entries(ingredients)
        .reduce((accumulator, entry) => accumulator + (INGREDIENT_PRICES[entry[0]] * entry[1]), initialState.totalPrice)
};

const isPurchasable = (ingredients) => {
    return Object.values(ingredients)
        .some(value => value > 0);
};

const burgerAddIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.payload]: state.ingredients[action.payload] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
        purchasable: true
    };
};

const burgerRemoveIngredient = (state, action) => {
    const ingredients = {
        ...state.ingredients,
        [action.payload]: state.ingredients[action.payload] - 1
    };
    return {
        ...state,
        ingredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload],
        purchasable: isPurchasable(ingredients)
    };
};

const burgerInitIngredientSuccess = (state, action) => {
    return {
        ...state,
        ingredients: action.payload,
        totalPrice: calculateTotalPrice(action.payload),
        purchasable: isPurchasable(action.payload),
        loading: false,
        error: null
    };
};

const burgerInitIngredientsFailed = (state, action) => {
    return {
        ...state,
        error: action.payload,
        loading: false
    };
};

const burgerInitIngredientsLoading = state => {
    return {
        ...state,
        loading: true
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BURGER_ADD_INGREDIENT:
            return burgerAddIngredient(state, action);
        case BURGER_REMOVE_INGREDIENT:
            return burgerRemoveIngredient(state, action);
        case BURGER_INIT_INGREDIENTS_SUCCESS:
            return burgerInitIngredientSuccess(state, action);
        case BURGER_INIT_INGREDIENTS_FAILED:
            return burgerInitIngredientsFailed(state, action);
        case BURGER_INIT_INGREDIENTS_LOADING:
            return burgerInitIngredientsLoading(state);
        default:
            return state;
    }
};

export default reducer;

