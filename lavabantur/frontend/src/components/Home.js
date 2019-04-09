import React, {Component} from 'react';
import {Row, Col} from 'antd';
import LogIn from "./LogInForm";


class Home extends Component {


    render() {
        return (
            <div className={"content"}>


                        <h1>Home</h1>

                        <p className={"info-box"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque gravida nibh. Cras accumsan, libero ut commodo interdum, nibh mi semper mi, at auctor quam ipsum id lacus. Donec enim nunc, lobortis eget iaculis molestie, interdum et sapien. Quisque euismod iaculis consequat. Integer egestas dolor vitae diam imperdiet, a facilisis augue sagittis. Donec semper sit amet nibh ut ornare. Maecenas laoreet tellus sed erat ornare, sit amet fringilla erat laoreet. Cras hendrerit luctus magna a mollis. Cras suscipit quis urna id maximus. Donec vel blandit est. Mauris eu tincidunt metus.

                        </p>

                        <div id={"login-container"}>

                            <LogIn/>

                        </div>



            </div>
        );
    }
}

export default Home;
