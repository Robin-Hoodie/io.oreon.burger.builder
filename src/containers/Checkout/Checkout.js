import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import {connect} from 'react-redux';

class Checkout extends Component {

    handleCancel = () => {
        this.props.history.goBack();
    };

    handleContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ingredients}
                                 onCancel={this.handleCancel}
                                 onContinue={this.handleContinue}/>
                <Route path={`${this.props.match.path}/contact-data`}
                       component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);