import React from 'react';
import classes from './Button.css';

const Button = props => (
    <button onClick={props.onClick}
            disabled={props.disabled}
            className={[classes.Button, classes[props.type]].join(' ')}>
        {props.children}
    </button>
);

export default Button;