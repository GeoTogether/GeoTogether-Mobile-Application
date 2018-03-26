import React from 'react';
import Timeline from 'react-native-timeline-listview';
import {StyleSheet, View} from "react-native";
import firebase from "../Firebase/firebaseStorage";
import ActionBar from 'react-native-action-bar';

export default class TimeLineScreen extends React.Component {

    static navigationOptions = {
        header: null
    };


    constructor(props) {
        super(props);

        this.data = [
            {time: '9:00 AM', title: "Breakfast", description: "Eating at Denny's with the Pied Piper team", circleColor: 'yellow',lineColor: 'yellow'},
            {time: '11:00 AM', title: "Museum", description: "Visit the State Museum with the team", circleColor: 'white', lineColor:'white'},
            {time: '1:15 PM', title: "Lunch", circleColor: 'white', lineColor:'white'},
            {time: '3:00 PM', title: "Bus Tour", description: "Adress to the Bus: 423 E. Cale St. Somewhere, Land", circleColor: 'white', lineColor:'white'},
        ]


    }

    // the user state with all of the user and the trip information
    state = {
        events: [],
        eventTitle: '',
        eventAddress: '',
        startTimeChosen:'00:00',
        endTimeChosen: '00:00',
    };


    componentWillMount() {

        const { state } = this.props.navigation;

        if ((state.params.trip.events !== undefined)) {
            for (var i = 0; i < state.params.trip.events.length; i++) {
                this.state.events.push(state.params.trip.events[i]);
            }
            console.log("Events: ", this.state.events);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        return (
            <View style={styles.container}>
                 <ActionBar
                    containerStyle={styles.bar}
                    title={state.params.trip.tripName}
                    titleStyle={styles.title}
                    backgroundColor={'black'}
                    leftIconImage={require('../../images/profile.png')}
                    onLeftPress={() => navigate('ProfileSettings', { email: state.params.email, trip:state.params.trip })}
                    rightIcons={[
                        {
                            image: require('../../images/map.png'), // To use a custom image
                            badge: '1',
                            onPress: () => navigate('GMapView', { email: state.params.email, trip:state.params.trip }),
                        },{
                            image: require('../../images/settings.png'), // To use a custom image
                            badge: '1',
                            onPress: () => console.log('Right Custom image !'),
                        },
                    ]}
                />

            <Timeline
                style={styles.list}
                data={this.data}
                circleSize={20}
                separator={false}
                circleColor='rgb(45,156,219)'
                //lineColor='rgb(45,156,219)'
                timeContainerStyle={{minWidth:125, marginTop: -5}}
                timeStyle={{fontSize: 20, textAlign: 'center', color:'white'}}
                titleStyle={{fontSize: 24, color:'#fff'}}
                descriptionStyle={{color:'white'}}
                options={{
                    style:{paddingTop:100, paddingRight: 20},
                    backgroundColor: '#001c7d'
                }}
            />
            </View>
        )

    }



}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    list:{
        //paddingTop: 30,
        //backgroundColor:'#118bff'
    }

});

