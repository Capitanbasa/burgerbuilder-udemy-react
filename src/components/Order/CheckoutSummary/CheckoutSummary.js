import React, { Component } from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';
class CheckoutSummary extends Component{
    render(){
        return (
            <div className={classes.CheckoutSummary}>
                <h1>Hope it taste well!</h1>
                <div style={{ width : '100%', margin : 'auto'}}>
                    <Burger ingredients={this.props.indgredients}/>
                </div>
                <Button eventHandler={this.props.checkoutCancelled} myclassname="Danger">CANCEL</Button>
                <Button eventHandler={this.props.checkoutContinued} myclassname="Success">CONTINUE</Button>
            </div>
        );
    }
}

export default CheckoutSummary;