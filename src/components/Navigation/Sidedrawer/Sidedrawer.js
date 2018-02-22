import React from 'react';
import classes from './Sidedrawer.css';
import Logo from '../../../hoc/Layout/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux'
const Sidedrawer = (props) => {
    let attachedClasses = [classes.Sidedrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.Sidedrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} hideModal={props.closed}/>
            <div className={attachedClasses.join(' ')} >
                <Logo height="11%"/>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default Sidedrawer;