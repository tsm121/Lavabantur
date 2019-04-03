import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Navigation extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/overview'>Overview</NavLink></li>
                    <li><NavLink to='/booking'>Booking</NavLink></li>
                </ul>
            </nav>
        );
    }
}

export default Navigation;
