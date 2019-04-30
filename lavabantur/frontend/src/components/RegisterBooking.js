import React, {Component} from 'react';
import {Button, Modal, Select, DatePicker, Row, Col, TimePicker} from "antd";
import moment from 'moment';
import locale from 'moment/locale/nb';
const axios = require('axios');


const Option = Select.Option;

const dateFormat = 'DD/MM/YYYY';
const dateFormat2 = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';
let dateLimit = moment().startOf("day")

moment.locale("nb")

class RegisterBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            ModalText:"",
            date: "",
            startTime: "",
            endTime:"",
            selectedMachine: "1",
        }

        this.handleRegisterNewBookingButton = this.handleRegisterNewBookingButton.bind(this)
        this.showModal = this.showModal.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleDateSelection = this.handleDateSelection.bind(this)
        this.handleStartTimeSelection = this.handleStartTimeSelection.bind(this)
        this.handleEndTimeSelection = this.handleEndTimeSelection.bind(this)
        this.handleSaveBookingButton = this.handleSaveBookingButton.bind(this)

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({
            ModalText: 'Checking Database',
            confirmLoading: true,
        });

        this.handleSaveBookingButton()

        setTimeout(() => {
            this.setState({
                ModalText: "",
                visible: false,
                confirmLoading: false,
            });
        }, 2000);

    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }


    handleRegisterNewBookingButton () {
        this.showModal()
    }

    disabledDate(current) {
        return current && current < dateLimit;
    }

    handleDateSelection (value) {
        let tempDate = value.format(dateFormat2).toString()
        this.setState({
            date: tempDate
        })

    }

    handleStartTimeSelection (value) {

        this.setState({
            startTime: value.format(timeFormat).toString()
        })
    }

    handleEndTimeSelection (value) {
        this.setState({
            endTime: value.format(timeFormat).toString()
        })
    }

    handleChange(value) {
        const machine = value.split(" ")[1];
        this.setState({selectedMachine: machine});
    }

    handleSaveBookingButton () {
        const {date, startTime, endTime, selectedMachine} = this.state
        let dateStringStart = date+"T"+startTime+":00+02:00"
        let dateStringEnd = date+"T"+endTime+":00+02:00"

        let data =
            {
                "washing_machine": selectedMachine,
                "start_time": dateStringStart,
                "end_time": dateStringEnd,
                "used": false
            }

         console.log(this.postData(data))
    }

    postData (data) {
        let response = axios.post('http://localhost:8000/washingmachine/', data)
            .then(function (response) {
                // handle success
                //console.log(response);
                return (response.status)
            })
            .catch(function (error) {
                // handle error
                //console.log(error);
            })

        return response
    }


    render() {
        const {visible, confirmLoading, ModalText, selectedMachine} = this.state
        let {listValues} = this.props
        let newListValues = listValues.slice(1,)

        return (
            <div>
                <Button
                    onClick={this.handleRegisterNewBookingButton}
                >
                    Add new booking
                </Button>


                <Modal
                    title="Register a booking"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    style={{width:"80%"}}
                >
                    <Row>

                        <Col>

                            <p>{ModalText}</p>
                        </Col>



                        <Row style={ ModalText.length > 0 ? {display:"none"} : {display:"unset"}}>


                        <Col>

                            <Select defaultValue={"Machine " + selectedMachine} style={{ width: "13em" }} onChange={this.handleChange.bind(this)}>

                                {newListValues.map( name => {
                                    return (
                                        <Option key={name} value={name}>{name}</Option>
                                    )
                                })}
                            </Select>

                        </Col>

                        <Col>


                            <DatePicker
                                placeholder={"Start date"}
                                disabledDate={this.disabledDate}
                                format={dateFormat}
                                locale={locale}
                                showTime={false}
                                showToday={false}
                                onChange={this.handleDateSelection}
                            />
                        </Col>
                        <Col>
                            <TimePicker
                                defaultOpenValue={moment(timeFormat)}
                                placeholder={"Start"}
                                format={timeFormat}
                                minuteStep={15}
                                onChange={this.handleStartTimeSelection}
                            />

                            <TimePicker
                                defaultOpenValue={moment(timeFormat)}
                                placeholder={"End"}
                                format={timeFormat}
                                minuteStep={15}
                                onChange={this.handleEndTimeSelection}
                            />
                        </Col>
                        </Row>

                    </Row>

                </Modal>

            </div>

        );
    }
}

export default RegisterBooking;
