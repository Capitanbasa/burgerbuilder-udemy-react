import React from 'react';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './Modal.css';
const modal = (props) => (
    <Aux>
        <div 
            className={classes.Modal} 
            style={{ 
                transform : props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity : props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
        <Backdrop show = {props.show} hideModal={props.backdrophide}/>
    </Aux>
);
export default modal;