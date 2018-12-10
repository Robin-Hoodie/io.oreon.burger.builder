import React, {Component, lazy, Suspense} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import {checkAuthState} from './store/actions/authActions';
import Spinner from './components/UI/Spinner/Spinner';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    //TODO: Use React.lazy when react-router-dom 4.4 lands, see https://github.com/ReactTraining/react-router/issues/6471
    render() {

        let routes = (
            <Switch>
                <Route path="/auth"
                       component={Auth}/>
                <Route path="/"
                       component={BurgerBuilder}/>
                <Redirect to="/"/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout"
                           component={Checkout}/>
                    <Route path="/orders"
                           component={Orders}/>
                    <Route path="/auth"
                           component={Auth}/>
                    <Route path="/logout"
                           component={Logout}/>
                    <Route path="/"
                           component={BurgerBuilder}/>
                    <Redirect to="/"/>
                </Switch>
            )
        }
        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(checkAuthState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
