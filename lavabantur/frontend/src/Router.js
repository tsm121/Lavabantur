import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from "./components/Home";
import Overview from "./components/Overview";
import Booking from "./components/Booking";
import Statistics from "./components/Statistics";
import Register from "./components/Register";


class Router extends Component {
    render() {
        const {data,updateData,NUM_MACHINES} = this.props
        return (
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/overview' component={() => <Overview
                    data={data}
                    NUM_MACHINES={NUM_MACHINES}
                    updateData={updateData}
                />}/>
                <Route exact path='/booking' component={() => <Booking
                    data={data}
                    NUM_MACHINES={NUM_MACHINES}
                />}/>
                <Route exact path='/statistics' component={() => <Statistics data={data} />}/>
                <Route exact path='/register' component={Register}/>
            </Switch>
        );
    }
}

export default Router;
