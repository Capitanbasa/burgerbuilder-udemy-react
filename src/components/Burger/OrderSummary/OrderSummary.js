import React from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button';
const OrderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients)
        .map((iKey) => {
            return (<li key={iKey}><span style={{ textTransform : 'capitalize'}}>{iKey}</span> : {props.ingredients[iKey]}</li>);
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A Delicious Burger with the following Ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Continue to Checkout?</p>
            <Button eventHandler={props.cancelevent} myclassname="Danger">CANCEL</Button>
            <Button eventHandler={props.checkout} myclassname="Success">CONTINUE</Button>
        </Aux>
    );
};
export default OrderSummary;