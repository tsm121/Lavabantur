import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from "./components/Home";
import Overview from "./components/Overview";
import Booking from "./components/Booking";


class Router extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/overview' component={Overview}/>
                <Route exact path='/booking' component={Booking}/>
            </Switch>
        );
    }
}

export default Router;
