import React, {Component} from 'react';
import classes from './BuildControls.css';
import PropTypes from 'prop-types';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

class BuildControls extends Component {
    render() {
        return (
            <div className={classes.BuildControls}>
                <p>Current price: <strong>{this.props.price.toFixed(2)}</strong></p>
                {controls.map(control => <BuildControl
                    key={control.label}
                    label={control.label}
                    onIngredientAdded={() => this.props.onIngredientAdded(control.type)}
                    onIngredientRemoved={() => this.props.onIngredientRemoved(control.type)}
                    disabled={this.props.disabled[control.type]}
                />)}
                <button className={classes.OrderButton}
                        disabled={!this.props.purchasable}
                        onClick={this.props.onOrderNow}>
                    ORDER NOW
                </button>
            </div>
        );
    }
}

BuildControls.propTypes = {
    price: PropTypes.number.isRequired
};

export default BuildControls;