import React, {Component} from 'react';
import LogIn from "./LogInForm";


class Home extends Component {


    render() {
        return (
            <div className={"content"}>

                <h1>Home</h1>

                <p className={"info-box"}>
                    Velkommen til Lavabantur! Mer tekst her og bilde her??
            Fjernet Login boks
                </p>
            </div>
        );
    }
}

export default Home;
