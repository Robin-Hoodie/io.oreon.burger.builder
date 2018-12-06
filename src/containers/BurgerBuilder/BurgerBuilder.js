import React, {Component} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner.js';

import {connect} from 'react-redux';
import {burgerAddIngredient, burgerRemoveIngredient, burgerInitIngredients} from '../../store/actions/burgerActions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.initIngredients();
    }

    handleAddIngredient = (type) => {
        this.props.addIngredient(type);
    };

    handleRemoveIngredient = (type) => {
        this.props.removeIngredient(type);
    };

    handleOrderNow = () => {
        this.setState({
            purchasing: true
        });
    };

    handleModalClose = () => {
        this.setState({
            purchasing: false
        })
    };

    handlePurchaseCancel = () => {
        this.setState({
            purchasing: false
        });
    };

    handlePurchaseContinue = async () => {
        const queryParams = [];
        queryParams.push(`price=${this.props.totalPrice}`);
        for (let key in this.props.ingredients) {
            queryParams.push(`${encodeURIComponent(key)}=${this.props.ingredients[key]}`)
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryString}`
        });
    };

    render() {
        const disableInfo = {
            ...this.props.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let modalContent = <OrderSummary ingredients={this.props.ingredients}
                                         onCancel={this.handlePurchaseCancel}
                                         onContinue={this.handlePurchaseContinue}
                                         price={this.props.totalPrice}/>;
        if (this.props.loading || !this.props.ingredients) {
            modalContent = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        }
        let burger = (
            <>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls
                    price={this.props.totalPrice}
                    purchasable={this.props.purchasable}
                    disabled={disableInfo}
                    onIngredientAdded={this.handleAddIngredient}
                    onIngredientRemoved={this.handleRemoveIngredient}
                    onOrderNow={this.handleOrderNow}
                />
            </>);
        if (!this.props.ingredients) {
            burger = <Spinner/>;
        }
        return (
            <>
                <Modal show={this.state.purchasing}
                       onModalClose={this.handleModalClose}>
                    {modalContent}
                </Modal>
                {burger}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        purchasable: state.burger.purchasable,
        error: state.burger.error,
        loading: state.burger.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: ingredient => dispatch(burgerAddIngredient(ingredient)),
        removeIngredient: ingredient => dispatch(burgerRemoveIngredient(ingredient)),
        initIngredients: () => dispatch(burgerInitIngredients())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));