import React from 'react';
import classes from './Button.css'
const button = (props) => {
    return <button className={[classes.Button, classes[props.myclassname]].join(' ')} onClick={props.eventHandler}>{props.children}</button>
};

export default button;