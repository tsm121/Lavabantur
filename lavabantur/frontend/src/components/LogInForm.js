import React, {Component} from 'react';
import {Input, Icon, Row, Card, Popover} from 'antd';
import { browserHistory } from 'react-router';
import {
    withRouter
} from 'react-router-dom'


class LogInForm extends Component {
    constructor(props) {
        super(props);

        this.handleLogInClick = this.handleLogInClick.bind(this)
        this.handleCreateUserClick = this.handleCreateUserClick.bind(this)

    }

    handleLogInClick () {
        console.log("Clicked log in")
    }

    handleCreateUserClick () {
        console.log("Clicked register")
        this.props.history.push('/register')
    }

    render() {
        return (
            <Card
                title={"Log in"}
                actions={[

                    <Popover content={"Log in"} placement={"bottom"}>
                        <Icon
                            type="check"
                            onClick={this.handleLogInClick}

                        />
                    </Popover>,

                    <Popover content={"Create a user"} placement={"bottom"}>
                        <Icon
                            type="form"
                            onClick={this.handleCreateUserClick}
                        />
                    </Popover>
                ]}
            >

                <Row style={{paddingBottom:"1em"}}>

                    <Input
                        placeholder="Enter your username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </Row>
                <Row>

                    <Input.Password
                        placeholder="Input password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />

                </Row>
            </Card>
        );
    }
}

export default withRouter(LogInForm);
