import React, {Component} from 'react';


class Footer extends Component {
    render() {
        return (
            <div id={"footer"}>
                Lavabantur <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> 2019

            </div>
        );
    }
}

export default Footer;
