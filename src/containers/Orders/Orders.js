import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import {fetchOrders} from '../../store/actions/orderActions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        if (this.props.loading) {
            return <Spinner/>;
        }
        return (
            <div>
                {this.props.orders.map(order => (
                        <Order key={order.id}
                               price={order.data.price}
                               ingredients={order.data.ingredients}/>
                    )
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        orders: state.order.orders,
        loading: state.order.fetchLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));