import React, {Component} from 'react';
import classes from './OrderSummary.css';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {
        const ingredientSummary = Object.entries(this.props.ingredients)
            .map(entry => (
                    <li key={entry[0]}>
                        <span className={classes.OrderSummary__Item}>{entry[0]}</span>: {entry[1]}
                    </li>
                )
            );
        return (
            <>
                <h3>Your order</h3>
                <p>Delicious burger with the following ingredients:</p>
                <ul>{ingredientSummary}</ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button onClick={this.props.onCancel}
                        type="Danger">
                    CANCEL
                </Button>
                <Button onClick={this.props.onContinue}
                        type="Success">
                    CONTINUE
                </Button>
            </>
        );
    }
}

export default OrderSummary;