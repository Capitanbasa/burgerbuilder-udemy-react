import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';

class Orders extends Component {
    state = {
        orders : [],
        loading : true
    }
    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const fetchOrders = [];
                for(let key in response.data){
                    fetchOrders.push({
                        ...response.data[key],
                        id : key
                    });
                }
                this.setState({loading : false ,orders : fetchOrders});
            })
            .catch(error => {
                this.setState({ loading : false});
            });
    }
    render(){
        const orderList = this.state.orders.map(order => {
            return <Order key={order.id} orderdata={order} price={order.price} ingredients={order.ingredients}/>
        });
        return(
            <div>
                {orderList}
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);