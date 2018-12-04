import React, {Component} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Spinner from '../../components/UI/Spinner/Spinner.js';

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    };

    async componentDidMount() {
        try {
            const response = await axios.get('/ingredients.json');
            this.setState({
                ingredients: response.data
            });
        } catch (error) {
            console.error(error);
            this.setState({
                error
            });
        }
    }

    updatePurchasable(updatedIngredients) {
        const sum = Object.values(updatedIngredients)
            .reduce((accumulator, current) => accumulator + current, 0);
        this.setState({
            purchasable: sum > 0
        });
    }

    handleAddIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients,
            [type]: updatedCount
        };
        this.setState(prevState => {
            return {
                ingredients: updatedIngredients,
                totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
            };
        });
        this.updatePurchasable(updatedIngredients);
    };

    handleRemoveIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) return;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients,
            [type]: updatedCount
        };
        this.setState(prevState => {
            return {
                ingredients: updatedIngredients,
                totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]
            };
        });
        this.updatePurchasable(updatedIngredients);
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
        queryParams.push(`price=${this.state.totalPrice}`);
        for (let key in this.state.ingredients) {
            queryParams.push(`${encodeURIComponent(key)}=${this.state.ingredients[key]}`)
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryString}`
        });
    };

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let modalContent = <OrderSummary ingredients={this.state.ingredients}
                                         onCancel={this.handlePurchaseCancel}
                                         onContinue={this.handlePurchaseContinue}
                                         price={this.state.totalPrice}
        />;
        if (this.state.loading || !this.state.ingredients) {
            modalContent = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        }
        let burger = (
            <>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    disabled={disableInfo}
                    onIngredientAdded={this.handleAddIngredient}
                    onIngredientRemoved={this.handleRemoveIngredient}
                    onOrderNow={this.handleOrderNow}
                />
            </>);
        if (!this.state.ingredients) {
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

export default withErrorHandler(BurgerBuilder, axios);