import React, {Component} from 'react';
import {Input, Icon, Row, Col, Popover, Button} from 'antd';


class LogInFormDrawer extends Component {
    constructor(props) {
        super(props);

        this.handleLogInClick = this.handleLogInClick.bind(this)
        this.handleCreateUserClick = this.handleCreateUserClick.bind(this)

    }

    handleLogInClick () {
        const {closeDrawer} = this.props

        console.log("Clicked log in")
        closeDrawer()

    }

    handleCreateUserClick () {
        const {openRegisterDrawer} = this.props

        console.log("Clicked register")
        openRegisterDrawer()

    }

    render() {
        return (
            <div className={"content"}>

                <Row type="flex" justify="space-around" align="middle">
                    <Col style={{width:"20em"}}>

                        <Row>
                            <Col>

                                <div>
                                    <Input
                                        placeholder="Enter your username"
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    />
                                </div>
                                <div style={{paddingBottom:"1em", paddingTop:"1em"}}>

                                    <Input.Password
                                        placeholder="Input password"
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    />
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col id={"drawer-button-group"}>

                                <Popover content={"Log in"} placement={"bottom"}>
                                    <Button
                                        className={"drawer-button"}
                                        onClick={this.handleLogInClick}
                                    >
                                        <Icon
                                            type="check"
                                        />
                                    </Button>
                                </Popover>

                                <span className="divider"/>


                                <Popover content={"Create a user"} placement={"bottom"}>
                                    <Button
                                        className={"drawer-button"}
                                        onClick={this.handleCreateUserClick}
                                    >
                                        <Icon
                                            type="form"
                                        />
                                    </Button>
                                </Popover>

                            </Col>
                        </Row>

                    </Col>
                </Row>
            </div>
        );
    }
}

export default LogInFormDrawer;
