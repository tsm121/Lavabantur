import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon, Drawer } from 'antd';
import LogInFormDrawer from "./LogInFormDrawer";
import RegisterFormDrawer from "./RegisterFormDrawer";


class Navigation extends Component {
    state = {
        current: 'home',
        visibleLogIn: false,
        visibleRegister: false,
        placement: 'top'
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    }

    showLogInDrawer = () => {
        this.setState({
            visibleLogIn: true,
        });
    };

    onCloseLogIn = () => {
        this.setState({
            visibleLogIn: false,
        });
    };

    showRegisterDrawer = () => {
        this.setState({
            visibleRegister: true,
        });
    };

    onCloseRegister = () => {
        this.setState({
            visibleRegister: false,
        });
    };

    openRegisterDrawer = () => {
        this.setState({
            visibleLogIn: false,
            visibleRegister: true,
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

                    <Menu.Item key={"login"} id={"login"}>
                        <a onClick={this.showLogInDrawer}>Log In</a>

                        <Drawer
                            title="Log in"
                            placement={this.state.placement}
                            closable={false}
                            onClose={this.onCloseLogIn}
                            visible={this.state.visibleLogIn}
                        >
                            <LogInFormDrawer closeDrawer={this.onCloseLogIn} openRegisterDrawer={this.openRegisterDrawer}/>
                        </Drawer>

                    </Menu.Item>

                    <Menu.Item key={"register"} id={"register"}>
                        <a onClick={this.showRegisterDrawer}>Register</a>

                        <Drawer
                            title="Register"
                            placement={this.state.placement}
                            closable={false}
                            onClose={this.onCloseRegister}
                            visible={this.state.visibleRegister}
                        >
                            <RegisterFormDrawer closeDrawer={this.onCloseRegister}/>
                        </Drawer>

                    </Menu.Item>
                </Menu>
            </nav>
        );
    }
}

export default Navigation;
