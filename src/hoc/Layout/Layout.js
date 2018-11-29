import React, {Component} from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
                <Toolbar onDrawerToggleClick={this.handleDrawerToggleClick}/>
                <SideDrawer onSideDrawerClose={this.handleSideDrawerClose}
                            show={this.state.showSideDrawer}/>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

export default Layout;