import React, {Component} from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    handleSideDrawerClose = () => {
        this.setState({
            showSideDrawer: false
        })
    };

    handleDrawerToggleClick = () => {
        this.setState(prevState => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        });
    };

    render() {
        return (
            <>
                <Toolbar onDrawerToggleClick={this.handleDrawerToggleClick}
                         isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer onSideDrawerClose={this.handleSideDrawerClose}
                            isAuthenticated={this.props.isAuthenticated}
                            show={this.state.showSideDrawer}/>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
};

export default connect(mapStateToProps)(Layout);