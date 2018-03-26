import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect} from 'react-router-dom';
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
        let summary = <Redirect to="/" />
        if(this.props.ings){
            const purchasedRedirect = this.props.init ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
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
        return summary;
    }
}
const mapStateToProps = state => {
    return {
        ings : state.bbrreducer.ingredients,
        price : state.bbrreducer.totalPrice,
        init : state.orderreducer.init
    }
}

export default connect(mapStateToProps)(Checkout);