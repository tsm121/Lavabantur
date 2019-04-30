import React, {Component} from 'react';
import { Select } from 'antd';
import '../App.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import RegisterBooking from "./RegisterBooking";
const Option = Select.Option;
const localizer = BigCalendar.momentLocalizer(moment);

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: this.props.data,
            listValues: [],
            selectedMachine: "ALL"
        }

        this.generateListName = this.generateListName.bind(this)
    }

    componentWillMount() {
        this.generateListName()
    }

    handleChange(value) {
        const machine = value !== "All" ? value.split(" ")[1] : "ALL";
        this.setState({selectedMachine: machine});
    }

    generateListName() {
        const {NUM_MACHINES} = this.props
        let listValues = []
        listValues.push("All")
        for (let i = 1; i < NUM_MACHINES; i++) {
            listValues.push("Machine " + i)
        }

        this.setState({
            listValues:listValues
        })

    }

    formatBookings(){
        const bookings = this.state.payload;
        const formatted = [];
        for (var i = 0; i < bookings.length; i++){
            if(bookings[i].washing_machine.toString() === this.state.selectedMachine || this.state.selectedMachine === 'ALL'){
                const start_time = new Date(bookings[i].start_time);
                const end_time = new Date(bookings[i].end_time);
                const toAdd = {title: 'Machine ' + bookings[i].washing_machine.toString(), start: start_time, end: end_time};
                formatted.push(toAdd);
            }
        }
        return formatted;
    }

    render() {
        const {listValues} = this.state;
        const bookings = this.formatBookings()
        return (
            <div className = "booking-view-container">
                <h1>Booking</h1>
                <div className="buttons-container">
                    <div className="selector-container">

                        <Select defaultValue="Select machine" style={{ width: "13em" }} onChange={this.handleChange.bind(this)}>

                            {listValues.map( name => {
                                return (
                                    <Option key={name} value={name}>{name}</Option>
                                )
                            })}
                        </Select>
                    </div>
                    <div className="button-container">
                        <RegisterBooking
                            listValues={listValues}
                        />
                    </div>
                </div>
                <div className="booking-container">
                    <BigCalendar
                        defaultView = 'week'
                        scrollToTime = {new Date(Date.now())}
                        localizer = {localizer}
                        events = {bookings}
                        startAccessor = "start"
                        endAccessor = "end" />
                </div>

                {/*<Dayz
                    display= 'week'
                    date = {moment()}
                events = {bookings}/>*/}
            </div>
        );
    }
}

export default Booking;
