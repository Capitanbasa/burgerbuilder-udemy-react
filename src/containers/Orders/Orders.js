import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onFecthOrders();
    }
    render(){
        let orderList = <Spinner />
        if(!this.props.loading && this.props.orders.length > 0){
            orderList = this.props.orders.map(order => {
                return <Order key={order.id} orderdata={order} price={order.price} ingredients={order.ingredients}/>
            });
        }
        return(
            <div>
                {orderList}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders : state.orderreducer.orders,
        loading : state.orderreducer.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFecthOrders : () => dispatch(actionCreators.fetchOrder())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));