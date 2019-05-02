import React, {Component} from 'react';
import LogIn from "./LogInForm";
import {Row, Col, Card} from "antd";
import {Menu} from "antd/lib/menu";


class Home extends Component {


    render() {
        return (
            <div className={"content"}>

                <div className={"home-page"}>
                        <img id={"logo-big"} alt={"logo"} src={require('../images/logo.png')} />
                        <h1>Lavabantur</h1>
                </div>


                <Card className={"info-box"}>

                <p >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec pellentesque gravida nibh.
                    Cras accumsan, libero ut commodo interdum, nibh mi semper mi, at auctor quam ipsum id lacus.
                    Donec enim nunc, lobortis eget iaculis molestie, interdum et sapien. Quisque euismod iaculis consequat.
                    Cras suscipit quis urna id maximus. Donec vel blandit est. Mauris eu tincidunt metus.
                </p>

                <h3>Nunc viverra</h3>

                <p >
                    Pellentesque sed risus facilisis, eleifend purus vel, efficitur velit. In ac rutrum nisl.
                    In suscipit risus sed suscipit commodo. Nunc viverra leo at massa eleifend lobortis.
                    Sed pellentesque velit nec lectus suscipit dapibus. Donec iaculis rhoncus malesuada.
                    Donec varius, libero id dapibus consectetur, massa justo efficitur metus, eget gravida eros elit sit amet sem.
                    Fusce sagittis congue nulla, ac interdum diam convallis ac. Aenean urna magna, pretium sed ultricies at, molestie sed nunc.
                    Donec vitae sem et nisi consectetur consequat id ut turpis.
                </p>

                </Card>


            </div>
        );
    }
}

export default Home;
