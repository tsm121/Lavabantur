import React, {Component} from 'react';
const axios = require('axios');

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: [{"washing_machine":1, "start_time":null, "end_time":null, "used":false}],
        }

        this.fetchData = this.fetchData.bind(this)
        this.savePayload = this.savePayload.bind(this)
    }


    componentWillMount() {
        this.savePayload()
    }

    fetchData () {
        let config = {
            headers: {
            }
        }

        let payload = axios.get('http://localhost:8000/washingmachine/?format=json',config)
            .then(function (response) {
                // handle success
                //console.log(response);
                return (response)
            })
            .catch(function (error) {
                // handle error
                //console.log(error);
            })

        return payload
    }

    savePayload () {
        this.fetchData().then(data =>(
            this.setState(() => (
                {payload: data["data"]}
            )))
        ).then( () => {
            console.log("savePayload",this.state.payload)
        })


    }

    render() {
        const {payload} = this.state

        console.log("render",payload)
        return (
            <div>
                <h1>Booking</h1>

                <ul>

                    {payload.sort((a,b) => a.end_time > b.end_time).map( (values) => {
                       return (

                           <li>
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
