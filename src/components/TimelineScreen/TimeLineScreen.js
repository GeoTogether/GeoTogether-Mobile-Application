import React from 'react';
import Timeline from 'react-native-timeline-listview';
import {StyleSheet, View, StatusBar, Dimensions, Image, NativeAppEventEmitter} from "react-native";
import firebase from "../Firebase/firebaseStorage";
import ActionBar from 'react-native-action-bar';
import TabNavigator from 'react-native-tab-navigator';


export default class TimeLineScreen extends React.Component {

    static navigationOptions = {
        header: null
    };


    constructor(props) {
        super(props);
    }

    // the user state with all of the user and the trip information
    state = {
        events: [],
        eventTitle: '',
        eventAddress: '',
        startTimeChosen: '00:00',
        endTimeChosen: '00:00',
        email: '',
    };


    data = [];

    componentWillMount() {
       
        const { state } = this.props.navigation;
        this.setState({ email: state.params.email });
        // this.data = [
        //     {time: '', title: "", description: "Add Description", circleColor: 'yellow',lineColor: 'yellow'}
        // ];

        if ((state.params.trip.events !== undefined)) {
            for (var i = 0; i < state.params.trip.events.length; i++) {
                this.state.events.push(state.params.trip.events[i]);
                console.log("Event Title: ", this.state.events[i].eventTitle, i);
                console.log("Start Time: ", this.state.events[i].startTimeChosen, i);
            }

            this.getEventInfo();
            // console.log("Events: ", this.state.events[0][0]);
        }
    }

    componentDidMount(){
     
    }


    px2dp(px) {

        const deviceW = Dimensions.get('window').width;

        const basePx = 375;

        return px * deviceW / basePx
    }


    getEventInfo() {

        for (var i = 0; i < this.state.events.length; i++) {
            console.log("Count:", i);
            this.data.push({
                time: this.state.events[i].startTimeChosen.toString(),
                title: this.state.events[i].eventTitle.toString(),
                description: "Add Description",
                circleColor: 'orange',
                lineColor: 'white'
            })
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;

        this.data.push({
            time: '0:00 PM',
            title: "Next Event Title",
            description: "Add Description",
            circleColor: 'white',
            lineColor: 'white'
        });

        return (
            <View style={styles.container}>
             
                <StatusBar
                    //status bar fix
                    //backgroundColor="black"
                    barStyle="dark-content"
                />
                <ActionBar
                    containerStyle={styles.bar}
                    title={state.params.trip.tripName}
                    titleStyle={styles.title}
                    backgroundColor={'white'}
                    iconImageStyle={{ tintColor: "black" }}
                    leftIconImage={require('../../images/profile.png')}
                    onLeftPress={() => navigate('ProfileSettings', { email: state.params.email, trip: state.params.trip })}
                    rightIcons={[
                        {
                            image: require('../../images/map.png'), // To use a custom image
                            //badge: '1',
                            onPress: () => navigate('GMapView', { email: state.params.email, trip: state.params.trip }),
                        }, {
                            image: require('../../images/settings.png'), // To use a custom image
                            //badge: '1',
                            onPress: () => navigate('AppSettings', { email: state.params.email })
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
                    timeContainerStyle={{ minWidth: 125, marginTop: -5 }}
                    timeStyle={{ fontSize: 20, textAlign: 'center', color: 'white' }}
                    titleStyle={{ fontSize: 24, color: '#fff' }}
                    descriptionStyle={{ color: 'white' }}
                    options={{
                        style: { paddingTop: 100, paddingRight: 20 },
                        backgroundColor: '#1855bf'
                    }}
                />

                <View>

                    <TabNavigator>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Chat'}
                            title="Chat"
                            renderIcon={() => <Image style={{ width: 27, height: 27 }} source={require('../../images/chat.png')} size={this.px2dp(15)} tintColor="#666" />}
                            renderSelectedIcon={() => <Image style={{ width: 27, height: 27 }} source={require('../../images/chat.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                            onPress={() => navigate('Chat', { email: this.state.email })}>
                        </TabNavigator.Item>

                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'home'}
                            title="Home"
                            renderIcon={() => <Image style={{ width: 27, height: 27 }} source={require('../../images/home.png')} size={this.px2dp(15)} tintColor="#666" />}
                            renderSelectedIcon={() => <Image style={{ width: 27, height: 27 }} source={require('../../images/home.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                            onPress={() => navigate('Home', { email: this.state.email })}>
                        </TabNavigator.Item>

                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Share'}
                            title="Share"
                            renderIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/share.png')} size={this.px2dp(15)} tintColor="#666" />}
                            renderSelectedIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/share.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                            onPress={() => navigate('Share', { email: this.state.email })}>
                        </TabNavigator.Item>
                    </TabNavigator>
                </View>
            </View>
        )

    }



}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    adContainer:{
        width: '100%',
        height: '10%',
        backgroundColor: '#FFF'
    },
    list: {
        //paddingTop: 30,
        //backgroundColor:'#118bff'
    }, title: {
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20
    },
    mainStyle: {
        flex: 1,
        width: '100%',
        height: '100%',
    },


});
