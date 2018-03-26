import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    };
};

export const purchaseBurgerFailed = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAILED,
        error : error
    };
};
const purchaseBurgerStart = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('./orders.json', orderData).then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name ,orderData))
        }).catch(error => {
            dispatch(purchaseBurgerFailed(error.message))
        });
    }
}
export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    }
}
const fetchOrderStart = () => {
    return {
        type : actionTypes.FETCH_ORDERS_START
    }
}
const fetchOrdersSuccess = (orderData) => {
    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders : orderData
    }
}
const fecthOrdersFailed = () => {
    return {
        type : actionTypes.FETCH_ORDERS_FAILED
    }
}
export const fetchOrder = (ordersData) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
        .then(response => {
            const fetchOrders = [];
            for(let key in response.data){
                fetchOrders.push({
                    ...response.data[key],
                    id : key
                });
            }
            dispatch(fetchOrdersSuccess(fetchOrders));
        })
        .catch(error => {
            dispatch(fecthOrdersFailed(error.message));
        });
    }
}

