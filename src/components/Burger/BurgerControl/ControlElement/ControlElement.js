import React from 'react';
import ControlElementClass from './ControlElement.css';
const ControlElement = (props) => (
    <div className={ControlElementClass.BuildControl}>
        <div className={ControlElementClass.Label}>{props.label}</div>
        <button 
            className = {ControlElementClass.Less}
            onClick = {props.removeClick} 
            disabled = {props.disablebutton}>Less</button>

        <button
            className={ControlElementClass.More}
            onClick = {props.addClick}>More</button>
    </div>
);
export default ControlElement;