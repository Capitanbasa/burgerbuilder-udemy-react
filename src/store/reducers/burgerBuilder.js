import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility'; 
//import axios from '../axios-order';

const initialState = {
    ingredients : null,
    totalPrice : 0,
    error : false
}
const INGREDIENT_PRICES = {
    salad : 15.5,
    bacon : 25.8,
    cheese : 20.09,
    meat : 25.01
    
}
const addIngredient = ( state, action ) => {
    const updatedIngredient = {[action.payload.ingredientName] : state.ingredients[action.payload.ingredientName] + 1};
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients : updatedIngredients,
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName]
    }
    return updatedObject(state, updatedState);
}
const removeIngredient = ( state, action ) => {
    const updatedIng = {[action.payload.ingredientName] : state.ingredients[action.payload.ingredientName] - 1};
    const updatedIngs = updatedObject(state.ingredients, updatedIng);
    const updatedSt= {
        ingredients : updatedIngs,
        totalPrice : state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName]
    }
    return updatedObject(state, updatedSt);
}
const setIngredient = ( state, action ) => {
    return updatedObject(state,{
        ingredients : {
            salad : action.payload.salad,
            bacon : action.payload.bacon,
            cheese : action.payload.cheese,
            meat : action.payload.meat
        },
        totalPrice :0,
        error : false
    });
}
const fetchIngredientFailed = (state, action) => {
    return updatedObject(state, {error : true });
}
const reducer = (state = initialState , action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT : return addIngredient( state, action );
        case actionTypes.REMOVE_INGREDIENT : return removeIngredient( state, action) ;
        case actionTypes.SET_INGREDIENTS : return setIngredient( state, action );
        case actionTypes.FETCH_INGREDIENT_FAILED : return fetchIngredientFailed( state, action );
        default : return state;
    }
}
export default reducer;