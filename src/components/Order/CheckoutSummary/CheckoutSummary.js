import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

const CheckoutSummary = props => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button type="Danger" onClick={props.onCancel}>CANCEL</Button>
            <Button type="Success" onClick={props.onContinue}>CONTINUE</Button>
        </div>
    )
};

export default CheckoutSummary;