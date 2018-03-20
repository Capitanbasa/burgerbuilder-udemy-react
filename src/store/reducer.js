import * as actionTypes from './actions';
//import axios from '../axios-order';

const initialState = {
    ingredients : {
        salad : 0,
        cheese : 0,
        meat : 0,
        bacon : 0
    },
    totalPrice : 0
}
const INGREDIENT_PRICES = {
    salad : 15.5,
    cheese : 20.09,
    meat : 25.01,
    bacon : 25.8
}

const reducer = (state = initialState , action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT : 
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.payload.ingredientName] : state.ingredients[action.payload.ingredientName] + 1
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT : 
            return { 
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.payload.ingredientName] : state.ingredients[action.payload.ingredientName] - 1
                },
                totalPrice : state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName]
           };
        default : 
            return state;
    }
}

export default reducer;