import React from 'react';
import classes from './Toolbar.css';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = props => (
    <header className={classes.Toolbar}>
        <DrawerToggle onClick={props.onDrawerToggleClick}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default Toolbar;