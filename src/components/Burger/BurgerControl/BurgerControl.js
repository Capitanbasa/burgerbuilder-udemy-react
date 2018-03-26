import React from 'react';
import BurgerControlClass from './BurgerControl.css';
import ControlElement from './ControlElement/ControlElement';
const controls = [
    {label : 'Salad', type : 'salad'},
    {label : 'Chesse', type : 'cheese'},
    {label : 'Bacon', type : 'bacon'},
    {label : 'Meat', type : 'meat'}
]
const BurgerControl = (props) => (
    <div className={BurgerControlClass.BuildControls}>
        <p>Total Price : <strong>{props.price.toFixed(2)}</strong></p>
        { controls.map(ctrl => (
            <ControlElement 
                key={ctrl.type}
                label={ctrl.label}
                addClick={() => props.ingredientAdd(ctrl.type)} 
                removeClick = {() => props.ingredientRemove(ctrl.type)}
                disablebutton = {props.disablebutton[ctrl.type]}/>)
            
        )}
        <button 
            className={BurgerControlClass.OrderButton}
            disabled = {!props.orderready}
            onClick = {props.showModalClick}>ORDER NOW</button>
    </div>
);

export default BurgerControl;