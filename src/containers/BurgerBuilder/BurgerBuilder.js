import React, {Component} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
};

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

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

    handlePurchaseContinue = () => {
        alert('You continue');
    };

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <>
                <Modal show={this.state.purchasing}
                       onModalClose={this.handleModalClose}>
                    <OrderSummary ingredients={this.state.ingredients}
                                  onCancel={this.handlePurchaseCancel}
                                  onContinue={this.handlePurchaseContinue}
                                  price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    disabled={disableInfo}
                    onIngredientAdded={this.handleAddIngredient}
                    onIngredientRemoved={this.handleRemoveIngredient}
                    onOrderNow={this.handleOrderNow}
                />
            </>
        );
    }
}