import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Navigation from "./components/Navigation";
import Router from "./Router";
import { Row, Col } from 'antd';
import Footer from "./components/Footer";

const axios = require('axios');


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: [],
        }

        this.fetchData = this.fetchData.bind(this)
        this.savePayload = this.savePayload.bind(this)
        this.handleUpdateData = this.handleUpdateData.bind(this)
    }

    componentWillMount() {
        this.savePayload()
    }

    handleUpdateData () {
        console.log("Fetching new data")
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
            //console.log("App.js DATA: ",this.state.payload)
        })

    }

    render() {
        const {payload} = this.state
        return (
            <div>
                <Row>
                    <Col>
                        <Navigation/>
                    </Col>

                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={16}>
                            <Router
                                data={payload}
                                updateData={this.handleUpdateData}
                            />
                        </Col>

                    </Row>
                </Row>
                <Footer/>
            </div>
        );
    }
}

export default App;
