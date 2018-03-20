import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
//import classes from './Checkout.css';
class Checkout extends Component{
    
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
                    indgredients={this.props.ings}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}/>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings : state.ingredients,
        price : state.totalPrice
    }
}

export default connect(mapStateToProps, null)(Checkout);