import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Navigation from "./components/Navigation";
import Router from "./Router";

import { Row, Col } from 'antd';
import Footer from "./components/Footer";

class App extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Navigation/>
                    </Col>
                    <Col>
                        <Router/>
                    </Col>
                </Row>
                <Footer/>
            </div>
        );
    }
}

export default App;
