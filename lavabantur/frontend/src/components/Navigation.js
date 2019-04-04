import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'antd';


class Navigation extends Component {
    state = {
        current: 'home',
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (

            <nav>

                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key={"home"}>
                        <img id={"logo"} alt={"logo"} src={require('../images/logo.png')} />
                        <NavLink exact activeClassName="current" to='/'/>
                    </Menu.Item>

                    <Menu.Item key={"overview"}>
                        <Icon type="book" />Overview
                        <NavLink exact activeClassName="current" to='/overview' />
                    </Menu.Item>

                    <Menu.Item key={"booking"}>
                        <Icon type="calendar" />Booking
                        <NavLink exact activeClassName="current" to='/booking' />
                    </Menu.Item>

                    <Menu.Item key={"statistics"}>
                        <Icon type="bar-chart" />Statistics
                        <NavLink exact activeClassName="current" to='/statistics' />
                    </Menu.Item>
                </Menu>
            </nav>
        );
    }
}

export default Navigation;
