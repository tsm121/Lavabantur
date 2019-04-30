import React, {Component} from 'react';
import {Button, Table} from "antd";
const { Column } = Table;

class StatusTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: this.props.data,
            tableData: [{key:0, washingMachine:"Undefined",status:"Undefined",available:"Undefined",booking:"Undefined"}]
        }
        this.formatData = this.formatData.bind(this)
        this.formatDate = this.formatDate.bind(this)
        this.sterilizeData = this.sterilizeData.bind(this)
        this.formatDateToString = this.formatDateToString.bind(this)
        this.addButton = this.addButton.bind(this)
        this.addStatusStyle = this.addStatusStyle.bind(this)
    }

    componentWillMount() {
        this.sterilizeData()
        this.formatData()
    }

    sterilizeData () {
        const {payload} = this.state

        for (let i in payload){
            let wmItem = payload[i]
            let tempStart_date = new Date (wmItem.start_time)
            let tempEnd_date = new Date (wmItem.end_time)
            wmItem.start_time = tempStart_date
            wmItem.end_time = tempEnd_date
        }
    }

    formatDateToString () {
        const {tableData} = this.state

        for (let i in tableData) {
            let wmItem = tableData[i]
            if (wmItem.available instanceof Date) {
                wmItem.available = this.formatDate(wmItem.available).toString()
            }
        }
    }

    formatData () {
        const {NUM_MACHINES} = this.props
        const {payload} = this.state
        let tempTableData = new Array(NUM_MACHINES)

        if (!payload.length) return


        for (let i in payload) {
            let status = "Available"
            let listItem = {}
            let wmItem = payload[i]
            let today = new Date()
            let twoHoursBeforeStart = new Date(wmItem.start_time).setHours(new Date(wmItem.start_time).getHours()-2)
            let date
            if (twoHoursBeforeStart < today && wmItem.end_time > today){
                if (tempTableData[wmItem.washing_machine - 1] !== undefined) {
                    let registeredDate = tempTableData[wmItem.washing_machine - 1].available
                    if (today <= wmItem.end_time && wmItem.end_time <= registeredDate) {
                        date = wmItem.end_time
                    } else {
                        date = registeredDate
                    }
                } else {
                    date = wmItem.end_time
                }

                if (wmItem.used && wmItem.start_time && wmItem.end_time > today) {
                    status = "Busy"
                }
                else if (!wmItem.used && twoHoursBeforeStart < today && wmItem.end_time > today) {
                    status = "Booked"
                }

                listItem = {
                    key: wmItem.washing_machine,
                    washingMachine: ("Machine " + wmItem.washing_machine),
                    status: this.addStatusStyle(status),
                    available: date,
                    booking: this.addButton(wmItem.washing_machine)
                }
                tempTableData.splice(wmItem.washing_machine - 1, 1, listItem)
            }

        }


        for (let i = 0; i < (NUM_MACHINES); i++) {
            let status = "Available"
            let listItem = {}

            if (tempTableData[i] === undefined){
                listItem = {
                    key: i+1,
                    washingMachine: ("Machine " + (i+1)),
                    status: this.addStatusStyle(status),
                    available: "Now",
                    booking: this.addButton(i+1)
                }

                tempTableData.splice(i, 1, listItem)
            }
        }



        this.setState(() => (
            {tableData: tempTableData}
        ))

        //console.log(tempTableData)

    }

    formatDate (tempDate) {
        return tempDate.toLocaleTimeString("nb-NO", {
            hourCycle: "h24",
            hour: 'numeric',
            minute:'2-digit'

        })
    }

    addButton (name) {
        return (
            <Button
                value={name}
            >
                <div>Book machine {name}</div>
            </Button>
        )
    }

    addStatusStyle(status) {
        let statusClass = status.toLowerCase() + "-status status-text"
        return (
            <div className={statusClass}>{status}</div>
        )
    }

    render() {
        const {tableData} = this.state
        this.formatDateToString()

        return (
            <div style = {{padding: '0 0 4rem 0'}}>
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
                        title=""
                        key="booking"
                        dataIndex="booking"
                    />
                </Table>
            </div>
        );
    }
}

export default StatusTable;
