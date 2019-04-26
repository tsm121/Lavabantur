import React, {Component} from 'react';
import StatusTable from "./StatusTable";
import {Button, Icon} from "antd";
const delay = ms => new Promise(res => setTimeout(res, ms));


class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
        this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this)
    }

    handleUpdateButtonClick = async () => {
        const {updateData} = this.props
        this.setState({ loading: true });
        await delay(500);
        updateData()
        console.log("Data updated")
        this.setState({ loading: false });
    }

    render() {
        const {data} = this.props
        return (
            <div className={"center-container"}>
                <h1>Overview</h1>
                <div id={"overview-container"}>

                    <StatusTable
                        data={data}
                    />

                    <Button type="primary" loading={this.state.loading} onClick={this.handleUpdateButtonClick}>
                        Update
                    </Button>


                </div>
            </div>
        );
    }
}

export default Overview;
