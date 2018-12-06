import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {resetSaveSuccess} from '../../store/actions/orderActions';

class Checkout extends Component {

    handleCancel = () => {
        this.props.history.goBack();
    };

    handleContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    componentWillUnmount() {
        if (this.props.saveSuccess) {
            this.props.resetSaveSuccess();
        }
    }

    render() {
        let summary = <Redirect to="/"/>;
        if (this.props.ingredients && !this.props.saveSuccess) {
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
        saveSuccess: state.order.saveSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetSaveSuccess: () => dispatch(resetSaveSuccess())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);