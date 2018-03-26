import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';
const initialState = {
    orders : [],
    loading: false,
    init : false,
    error : null
}
const purchaseBurgerStart = ( state ) => {
    return updatedObject( state, {loading : true });
}
const purchaseBurgerSuccess = ( state, action ) => {
    const newOrder = updatedObject( action.orderData, { id: action.orderId } );
    return updatedObject(state, { 
        loading : false,
        init : true,
        orders: state.orders.concat( newOrder )
    });
}
const purchaseFailed = ( state, action ) => {
    return updatedObject(state,{
        loading : false, 
        error : action.error
     });
}
const purchaseInit = ( state , action ) => {
    return updatedObject(state, { init : false });
}
const fetchOrderStart = ( state ) => {
    return updatedObject(state, { loading : true });
}
const fetchOrderSuccess = ( state, action ) => {
    return updatedObject(state, { loading : false, orders : action.orders });  
}
const fetchOrderFailed = ( state, action ) => {
    return updatedObject(state, { loading : false, error : action.error });
}

const orderReducer = (state = initialState , action) => {
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_START : return purchaseBurgerStart( state );
        case actionTypes.PURCHASE_BURGER_SUCCESS : return purchaseBurgerSuccess( state, action );
        case actionTypes.PURCHASE_BURGER_FAILED : return purchaseFailed( state, action );
        case actionTypes.PURCHASE_INIT : return purchaseInit( state, action );
        case actionTypes.FETCH_ORDERS_START : return fetchOrderStart( state );
        case actionTypes.FETCH_ORDERS_SUCCESS : return fetchOrderSuccess( state, action);
        case actionTypes.FETCH_ORDERS_FAILED : return fetchOrderFailed(state, action);
        default : return state;
    }
}


export default orderReducer;