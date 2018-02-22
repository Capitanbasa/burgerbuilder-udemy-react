import React , { Component }from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button';
class OrderSummary extends Component {
    render(){
        const ingredients = Object.keys(this.props.ingredients)
        .map((iKey) => {
            return (<li key={iKey}><span style={{ textTransform : 'capitalize'}}>{iKey}</span> : {this.props.ingredients[iKey]}</li>);
        });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A Delicious Burger with the following Ingredients:</p>
                <ul>
                    {ingredients}
                </ul>
                <p><strong>Total Price : {this.props.totalprice}</strong></p>
                <p>Continue to Checkout?</p>
                <Button eventHandler={this.props.cancelevent} myclassname="Danger">CANCEL</Button>
                <Button eventHandler={this.props.checkout} myclassname="Success">CONTINUE</Button>
            </Aux>
        );
    }
    
}
export default OrderSummary;