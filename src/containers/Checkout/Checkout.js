import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {resetAddOrderSuccess} from '../../store/actions/orderActions';

class Checkout extends Component {

    handleCancel = () => {
        this.props.history.goBack();
    };

    handleContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    componentWillUnmount() {
        if (this.props.addSuccess) {
            this.props.resetAddOrderSuccess();
        }
    }

    render() {
        let summary = <Redirect to="/"/>;
        if (this.props.ingredients && !this.props.addSuccess) {
            summary = (<div>
                <CheckoutSummary ingredients={this.props.ingredients}
                                 onCancel={this.handleCancel}
                                 onContinue={this.handleContinue}/>
                <Route path={`${this.props.match.path}/contact-data`}
                       component={ContactData}/>
            </div>)
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        addSuccess: state.order.addSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetAddOrderSuccess: () => dispatch(resetAddOrderSuccess())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);