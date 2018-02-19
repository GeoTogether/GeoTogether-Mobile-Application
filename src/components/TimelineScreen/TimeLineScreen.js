import React from 'react';
import Timeline from 'react-native-timeline-listview';
import {StyleSheet} from "react-native";
import firebase from "../Firebase/firebaseStorage";

export default class TimeLineScreen extends React.Component {

    constructor(props) {
        super(props)

        this.data = [
            {time: '1PM', title: 'TEST 1', description: 'THIS IS TEST 1'},
            {time: '2PM', title: 'TEST 2', description: 'THIS IS TEST 2'},
            {time: '3PM', title: 'TEST 3', description: 'THIS IS TEST 3'},
            {time: '4PM', title: 'TEST 4', description: 'THIS IS TEST 4'},
            {time: '5PM', title: 'TEST 5', description: 'THIS IS TEST 5'}
        ]


    }


    render() {
        const { navigate } = this.props.navigation;

        return (
            <Timeline
                data={this.data}
                circleSize={30}
                circleColor='red'
                lineColor='black'
                timeContainerStyle={{minWidth:52, marginTop: -5}}
                timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                descriptionStyle={{color:'gray'}}
                options={{
                    style:{paddingTop:5}
                }}
            />
        )

    }



}


const styles = StyleSheet.create({


});

