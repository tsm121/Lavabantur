import React, {Component} from 'react';
import { Select } from 'antd';
const Option = Select.Option;


class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: this.props.data,
            listValues: []
        }

        this.generateListName = this.generateListName.bind(this)
    }

    componentWillMount() {
        this.generateListName()
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    generateListName() {
        const {NUM_MACHINES} = this.props
        let listValues = []

        for (let i = 0; i < NUM_MACHINES; i++) {
            listValues.push("Machine " + i)
        }

        this.setState({
            listValues:listValues
        })

    }

    render() {
        const {listValues} = this.state
        return (
            <div>
                <h1>Booking</h1>

                <Select defaultValue="Select machine" style={{ width: "13em" }} onChange={this.handleChange}>

                    {listValues.map( name => {
                        return (
                            <Option key={name} value={name}>{name}</Option>
                        )
                    })}
                </Select>

            </div>
        );
    }
}

export default Booking;
