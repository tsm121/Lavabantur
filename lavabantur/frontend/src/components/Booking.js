import React, {Component} from 'react';

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: this.props.data,
        }
    }

    render() {
        const {payload} = this.state

        return (
            <div>
                <h1>Booking</h1>
                <ul>

                    {payload.sort((a,b) => a.end_time > b.end_time).map( (values) => {
                       return (

                           <li
                               key={values.washing_machine + "_wm_id"}
                           >
                               Name: {values.washing_machine}
                               Start Time: {values.start_time}
                               End Time: {values.end_time}
                               Used: {values.used}
                           </li>
                        )}
                    )}

                </ul>
            </div>
        );
    }
}

export default Booking;
