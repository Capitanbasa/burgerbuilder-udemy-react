import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
//import classes from './Checkout.css';
class Checkout extends Component{
    state = {
        ingredients : null,
        totalPrice : 0
    }
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for(let params of query.entries()){
            if(params[0] === 'price'){
                totalPrice = +params[1];
            }else{
                ingredients[params[0]] = +params[1];
            }
            
        }
        this.setState({ingredients : ingredients, totalPrice : totalPrice});
    }
    
    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }
    render(){
        return (
            <div>
                <CheckoutSummary 
                    checkoutCancelled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    indgredients={this.state.ingredients}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData {...props} ingredients={this.state.ingredients} totalprice={this.state.totalPrice}/>)} />
            </div>
        );
    }
}
export default Checkout;