import React, {Component} from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries} from 'react-vis';
import '../App.css';

class Statistics extends Component {


    getUsageByDays(data){
        const dataByDays = [0, 0, 0, 0, 0, 0, 0];
        //days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        for(let i = 0; i< data.length; i++){
            const date = new Date(data[i].start_time);
            const day = date.getDay();
            dataByDays[day] += 1;
        }
        const toReturn = [
            {x: "mon", y: dataByDays[1]},
            {x: "tue", y: dataByDays[2]},
            {x: "wed", y: dataByDays[3]},
            {x: "thu", y: dataByDays[4]},
            {x: "fri", y: dataByDays[5]},
            {x: "sat", y: dataByDays[6]},
            {x: "sun", y: dataByDays[0]}
        ];
        return toReturn;
    }

    getUsageByHours(data){
        const dataByHours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        for(let i = 0; i< data.length; i++){
            const hour = new Date(data[i].start_time).getHours() - 6;
            if (hour >= 0){
                dataByHours[hour] += 1;
            }
        }
        const toReturn = [
            {x: "06", y: dataByHours[0]},
            {x: "07", y: dataByHours[1]},
            {x: "08", y: dataByHours[2]},
            {x: "09", y: dataByHours[3]},
            {x: "10", y: dataByHours[4]},
            {x: "11", y: dataByHours[5]},
            {x: "12", y: dataByHours[6]},
            {x: "13", y: dataByHours[7]},
            {x: "14", y: dataByHours[8]},
            {x: "15", y: dataByHours[9]},
            {x: "16", y: dataByHours[10]},
            {x: "17", y: dataByHours[11]},
            {x: "18", y: dataByHours[12]},
            {x: "19", y: dataByHours[13]},
            {x: "20", y: dataByHours[14]},
            {x: "21", y: dataByHours[15]},
            {x: "22", y: dataByHours[16]},
            {x: "23", y: dataByHours[17]},
            {x: "24", y: dataByHours[18]}
        ];
        return toReturn;
    }

    render() {

        /*const data = [{"start_time": "2019-10-11 10:00:00"},
                        {"start_time": "2019-04-26 11:30:21"},
                    {"start_time": "2019-04-27 15:01:23"},
                    {"start_time": "2019-11-11 16:00:00"},
                    {"start_time": "2019-04-12 11:30:21"},
                    {"start_time": "2019-04-27 17:01:23"},
                    {"start_time": "2019-10-05 10:00:00"},
                    {"start_time": "2019-04-26 00:30:21"},
                    {"start_time": "2019-04-30 15:01:23"},
                    {"start_time": "2018-10-11 06:00:00"},
                    {"start_time": "2017-04-26 11:30:21"},
                    {"start_time": "2016-04-27 18:01:23"},
                    {"start_time": "2019-12-11 10:00:00"},
                    {"start_time": "2019-07-26 08:30:21"},
                    {"start_time": "2019-08-27 15:01:23"},
                    {"start_time": "2019-09-11 10:00:00"},
                    {"start_time": "2019-12-26 11:30:21"},
                    {"start_time": "2019-04-27 15:01:23"},
                    {"start_time": "2019-10-21 16:00:00"},
                    {"start_time": "2019-04-16 11:30:21"},
                    {"start_time": "2019-04-07 16:01:23"},
                    {"start_time": "2019-12-21 16:00:00"},
                    {"start_time": "2019-04-26 11:30:21"},
                    {"start_time": "2019-04-27 15:01:23"}];*/

        const {data} = this.props;
        let days = [{x: 1, y: 0}];
        let hours = [{x: 1, y: 0}];
        if (data){
            days = this.getUsageByDays(data);
            hours = this.getUsageByHours(data);
        } else{
            days = [{x: 1, y: 0}];
            hours = [{x: 1, y: 0}];
        }

        return (
            <div className="statistics-container">
                <div className="statistics-header">
                    <h1>Statistics</h1>
                </div>
                <div className="statistics-view">
                    <div className = "by-day-statistics">

                        <h3>Total usage per day</h3>
                        <XYPlot
                            width={300}
                            height={300}
                            color={"#1890ff"}
                            xType = "ordinal">
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis
                                style={{
                                line: {stroke: '#BBB'},
                                ticks: {stroke: '#BBB'},
                                text: {stroke: 'none', fill: '#000000', fontWeight: 400}
                            }}
                            />
                            <YAxis
                                style={{
                                line: {stroke: '#BBB'},
                                ticks: {stroke: '#BBB'},
                                text: {stroke: 'none', fill: '#000000', fontWeight: 400}
                            }}
                            />
                            <VerticalBarSeries
                                data={days}/>
                        </XYPlot>
                    </div>
                    <div className="by-hour-statistics">

                        <h3>Total usage per hour</h3>
                        <XYPlot
                            width={500}
                            height={300}
                            color={"#1890ff"}
                            xType = "ordinal">
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis
                                style={{
                                line: {stroke: '#BBB'},
                                ticks: {stroke: '#BBB'},
                                text: {stroke: 'none', fill: '#000000', fontWeight: 400}
                            }}
                            />
                            <YAxis
                                style={{
                                line: {stroke: '#BBB'},
                                ticks: {stroke: '#BBB'},
                                text: {stroke: 'none', fill: '#000000', fontWeight: 400}
                            }}
                            />
                            <VerticalBarSeries
                                data={hours}/>
                        </XYPlot>
                    </div>
                </div>
            </div>
        );
    }
}

export default Statistics;
