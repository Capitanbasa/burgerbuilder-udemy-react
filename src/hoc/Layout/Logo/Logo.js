import React from 'react';
import BurgerLogo from '../../../assets/burger-logo.png';
import classes from './Logo.css';
const Logo = (props) => (
    <div className={classes.Logo} style={{height : props.height}}>
        <img src={BurgerLogo} alt="burgerlogo" />
    </div>
);
export default Logo;