import React, {Component} from 'react';
import StatusTable from "./StatusTable";
import {Button} from "antd";
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
        this.setState({ loading: false });
    }

    render() {
        const {data,NUM_MACHINES} = this.props
        return (
            <div className={"center-container"}>
                <h1>Overview</h1>
                <div id={"overview-container"}>

                    <StatusTable
                        data={data}
                        NUM_MACHINES={NUM_MACHINES}
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
