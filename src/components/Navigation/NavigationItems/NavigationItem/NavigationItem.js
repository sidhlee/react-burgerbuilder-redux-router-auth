import React from 'react';
import PropTypes from 'prop-types';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li> 
);

navigationItem.propTypes = {
    link: PropTypes.string,
    active: PropTypes.bool
}
export default navigationItem; 