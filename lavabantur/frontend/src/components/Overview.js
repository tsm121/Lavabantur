import React, {Component} from 'react';
import StatusTable from "./StatusTable";


class Overview extends Component {
    render() {
        const {data} = this.props
        return (
            <div className={"center-container"}>
                <h1>Overview</h1>
                <div id={"overview-container"}>

                    <StatusTable
                        data={data}
                    />

                </div>
            </div>
        );
    }
}

export default Overview;
