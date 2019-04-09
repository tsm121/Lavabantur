import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon, Drawer } from 'antd';
import LogInForm from "./LogInForm";
import LogInFormDrawer from "./LogInFormDrawer";


class Navigation extends Component {
    state = {
        current: 'home',
        visible: false,
        placement: 'top'
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onChange = (e) => {
        this.setState({
            placement: e.target.value,
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

                    <Menu.Item key={"login"}>
                        <a onClick={this.showDrawer}>Log In</a>

                        <Drawer
                            title="Log in"
                            placement={this.state.placement}
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.visible}
                        >
                            <LogInFormDrawer/>
                        </Drawer>
                    </Menu.Item>
                </Menu>
            </nav>
        );
    }
}

export default Navigation;
