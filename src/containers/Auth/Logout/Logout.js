import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import {logout} from '../../../store/actions/authActions';

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return (
            <Redirect to="/"/>
        );
    }
}

const mapDipatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
};

export default connect(null, mapDipatchToProps)(Logout);