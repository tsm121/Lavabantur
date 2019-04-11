import React, {Component} from 'react';
import {Input, Icon, Row, Col, Popover, Button} from 'antd';
import { withRouter } from 'react-router-dom'


class RegisterFormDrawer extends Component {
    constructor(props) {
        super(props);

        this.handleCreateUserClick = this.handleCreateUserClick.bind(this)
        this.handleCancelClick = this.handleCancelClick.bind(this)

    }

    handleCreateUserClick () {
        const {closeDrawer} = this.props

        console.log("Clicked create user")
        closeDrawer()

    }

    handleCancelClick () {
        const {closeDrawer} = this.props
        closeDrawer()
        console.log("Clicked close")
    }

    render() {
        return (
            <div className={"content"}>

                <Row type="flex" justify="space-around" align="middle">
                    <Col style={{width:"20em"}}>

                        <Row>
                            <Col>

                                <div style={{paddingBottom:"1em"}}>
                                    <Input
                                        placeholder="Enter a username"
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    />
                                </div>

                                <div style={{paddingBottom:"1em"}}>
                                    <Input
                                        placeholder="Enter your email"
                                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    />
                                </div>

                                <div style={{paddingBottom:"1em"}}>

                                    <Input.Password
                                        placeholder="Input a password"
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    />
                                </div>
                                <div style={{paddingBottom:"1em"}}>

                                    <Input.Password
                                        placeholder="Repeat password"
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    />
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col id={"drawer-button-group"}>

                                <Popover content={"Create user"} placement={"bottom"}>
                                    <Button
                                        className={"drawer-button"}
                                        onClick={this.handleCreateUserClick}
                                    >
                                        <Icon
                                            type="check"
                                        />
                                    </Button>
                                </Popover>

                                <span className="divider"/>


                                <Popover content={"Cancel"} placement={"bottom"}>
                                    <Button
                                        className={"drawer-button"}
                                        onClick={this.handleCancelClick}
                                    >
                                        <Icon
                                            type="close"
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

export default withRouter(RegisterFormDrawer);
