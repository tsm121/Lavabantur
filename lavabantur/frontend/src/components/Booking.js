import React, {Component} from 'react';

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: this.props.data,
        }
    }

    render() {
        return (
            <div>
                <h1>Booking</h1>

            </div>
        );
    }
}

export default Booking;
