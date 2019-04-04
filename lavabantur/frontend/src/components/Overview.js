import React, {Component} from 'react';
import { Table, Button } from 'antd';

const { Column } = Table;


const dataSource = [
    {
        key: '1',
        washingMachine: 'Machine 1',
        status: "Available",
        booking: 'Button Here?'
    },
    {
        key: '2',
        washingMachine: 'Machine 2',
        status: "Available",
        booking: 'Button Here?'
    },
    {
        key: '3',
        washingMachine: 'Machine 3',
        status: "Busy",
        booking: 'Button Here?'
    },
    {
        key: '4',
        washingMachine: 'Machine 4',
        status: "Available",
        booking: 'Button Here?'
    },
    {
        key: '5',
        washingMachine: 'Machine 5',
        status: "Booked",
        booking: 'Button Here?'
    },
    {
        key: '6',
        washingMachine: 'Machine 6',
        status: "Booked",
        booking: 'Button Here?'
    },
    {
        key: '7',
        washingMachine: 'Machine 7',
        status: "Available",
        booking: 'Button Here?'
    }
];

class Overview extends Component {
    render() {
        return (
            <div className={"center-container"}>
                <h1>Overview</h1>
                <div id={"overview-container"}>

                    <Table
                        dataSource={dataSource}
                        id={"overview-table"}
                        pagination={false}
                        size={"middle"}
                    >
                        <Column
                            title="Washing Machine ID"
                            dataIndex="washingMachine"
                            key="washingMachine"
                        />
                        <Column
                            title="Status"
                            dataIndex="status"
                            key="status"
                        />
                        <Column
                            title="Booking"
                            key="booking"
                            render={() => (
                                <Button htmlType={"button"}>
                                    Book this machine
                                </Button>
                            )}
                        />
                    </Table>
                </div>
            </div>
        );
    }
}

export default Overview;
