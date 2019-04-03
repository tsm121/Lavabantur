import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation";
import Router from "./Router";


class App extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                <Router/>
            </div>
        );
    }
}

export default App;
