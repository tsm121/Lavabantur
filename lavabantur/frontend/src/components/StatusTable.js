import React, {Component} from 'react';
import {Button, Table} from "antd";
const { Column } = Table;
const NUM_MACHINES = 10;

class StatusTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: this.props.data,
            tableData: [{key:0, washingMachine:"Undefined",status:"Undefined",available:"Undefined",booking:"Undefined"}]
        }


        this.formatData = this.formatData.bind(this)
        this.formatDate = this.formatDate.bind(this)
    }

    componentWillMount() {
        this.formatData()
    }

    formatData () {
        const {payload} = this.state
        let tempTableData = new Array(NUM_MACHINES)

        if (!payload.length) return


        for (let i in payload) {
            let status = "Available"
            let listItem = {}
            let wmItem = payload[i]
            let dateString = wmItem.end_time
            let date = this.formatDate(dateString)

            if (wmItem !== undefined){
                if (wmItem.used) {
                    status = "Busy"
                }
                else if (!wmItem.used) {
                    status = "Booked"
                }
                else {
                    status = "ERROR"
                }
                listItem = {
                    key: wmItem.washing_machine,
                    washingMachine: ("Machine " + wmItem.washing_machine),
                    status: status,
                    available: date,
                    booking: "Button_Here"
                }
            }
            tempTableData.splice(wmItem.washing_machine - 1, 1, listItem)
        }


        for (let i = 0; i < (NUM_MACHINES); i++) {
            let status = "Available"
            let listItem = {}

            if (tempTableData[i] === undefined){
                listItem = {
                    key: i+1,
                    washingMachine: ("Machine " + (i+1)),
                    status: status,
                    available: "Now",
                    booking: "Button_Here"
                }

                tempTableData.splice(i, 1, listItem)
            }
        }

        this.setState(() => (
            {tableData: tempTableData}
        ))

        console.log(tempTableData)

    }

    formatDate (date) {
        let tempDate = new Date(date)

        return (tempDate.toLocaleTimeString())
    }

    render() {
        const {tableData} = this.state

        return (
            <div>
                <Table
                    dataSource={tableData}
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
                        title="Available"
                        dataIndex="available"
                        key="available"
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
        );
    }
}

export default StatusTable;
