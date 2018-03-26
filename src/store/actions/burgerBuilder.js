import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredients = (payload) => {
    return{
        type : actionTypes.ADD_INGREDIENT,
        payload : payload
    }
};
export const removeIngredients = (payload) => {
    return{
        type : actionTypes.REMOVE_INGREDIENT,
        payload : payload
    }
};
export const setIngredients = (ingredients) => {
    return {
        type : actionTypes.SET_INGREDIENTS, 
        payload : ingredients
    }
}
export const setFailed = () => {
    return {
        type : actionTypes.FETCH_INGREDIENT_FAILED
    }
}
export const initIngredients = () => {
    return dispatch => { 
        axios.get('https://fireba-burgerapp.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(setFailed());
             });
    };
};