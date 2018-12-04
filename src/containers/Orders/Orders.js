import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: false
    };

    async componentDidMount() {
        this.setState({
            loading: true
        });
        try {
            const response = await axios.get('/orders.json');
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({
                orders: fetchedOrders
            });
        } catch (e) {
            console.error(e);
        } finally {
            this.setState({
                loading: false
            })
        }

    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                        <Order key={order.id}
                                price={order.price}
                                ingredients={order.ingredients}/>
                    )
                )}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);