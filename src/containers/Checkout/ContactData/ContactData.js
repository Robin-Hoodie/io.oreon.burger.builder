import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    handleOrder = async (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Robin Hellemans',
                address: {
                    street: 'Salvialaan 28',
                    zipCode: 2240,
                    country: 'Belgium'
                },
                email: 'robin@oreon.io'
            },
            deliveryMethod: 'fastest'
        };
        try {
            const response = await axios.post('/orders.json', order);
            console.log(response);
        } catch (error) {
            console.error(error);
        } finally {
            this.setState({
                loading: false
            });
            this.props.history.push('/');
        }
    };

    render() {
        let form = (
            <form action="">
                <input type="text" name="name" placeholder="Your name" />
                <input type="email" name="email" placeholder="Your email" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postalCode" placeholder="Postal Code" />
                <Button type="Success" onClick={this.handleOrder}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact details</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;