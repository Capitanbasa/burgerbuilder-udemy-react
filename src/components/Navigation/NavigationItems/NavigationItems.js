import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem active={false} link="#">Burger Builder</NavigationItem>
        <NavigationItem active={false} link="#">Check Out</NavigationItem>
    </ul>
);

export default NavigationItems;