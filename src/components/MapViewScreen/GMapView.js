import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Dimensions,
    NativeAppEventEmitter
} from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import MapViewDirections from 'react-native-maps-directions';
import ActionBar from 'react-native-action-bar';
import PopupDialog from 'react-native-popup-dialog';
import RNGooglePlaces from 'react-native-google-places';
import firebase from '../Firebase/firebaseStorage';
import Modal from "react-native-modal";
import TabNavigator from 'react-native-tab-navigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RevMobManager} from "react-native-revmob";
import userlocationIcon from '../../images/userlocation.png';




export default class GMapView extends React.Component {

    constructor(props) {
        super(props);



    }

    getTripInfo() {
        this.getTime();
        this.setState({ modalVisible: true });
    }

    getTime() {
        if (this.state.trip == "null") {

        }
        else {
            var TripDateEnd = this.state.trip.endDate.split('-');
            var UnixTripDateEnd = new Date(TripDateEnd[0] + '/' + TripDateEnd[1] + '/' + TripDateEnd[2]);
            var UnixTripDateStart = new Date();
            var x = new Date().toLocaleString();
            var diffMs = (UnixTripDateEnd - UnixTripDateStart); // milliseconds between now & Christmas

            var Days = Math.floor(diffMs / 86400000); // days
            var Hours = Math.floor((diffMs % 86400000) / 3600000); // hours
            var Mins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes


            if (diffMs <= 0) {
                this.setState({ days: ("0") });
                this.setState({ hours: ("0") });
                this.setState({ mins: ("0") });


            }
            else {
                this.setState({ days: (Days) });
                this.setState({ hours: (Hours) });
                this.setState({ mins: (Mins) });
            }





        }
    }

    closeInfo() {
        this.setState({ modalVisible: false });
    }

    getEventInfo() {

        this.setState({ modalVisible2: true });
    }

    closeEventInfo() {
        this.setState({ modalVisible2: false });
    }

    // navigation options to be used to navigate the class from other classes

    static navigationOptions = {
        title: 'GMapView',
        header: null
    }
    // the user state with all of the user and the trip information
    state = {
        email: '',
        destinations: [],
        markers: [],
        events: [],
        authenticating: this.props.authenticating,
        user: this.props.user,
        error: '',
        datastor: '',
        tripname: '',
        members: '',
        latitude: 0.1,
        longitude: 0.1,
        selectedcity: '',
        coords: [],
        modalVisible: false,
        modalVisible2: false,
        trip: "null",
        days: "0",
        hours: "0",
        mins: "0",
        eventsMarkers: [],
        userlatitude: 0.1,
        userlongitude: 0.1,
        selecteEvent: null,
    };


    px2dp(px) {

        const deviceW = Dimensions.get('window').width;

        const basePx = 375;

        return px * deviceW / basePx
    }

    componentWillMount() {

        const { state } = this.props.navigation;
        this.setState({ email: state.params.email });

        this.state.destinations.push(state.params.trip.destination1);
        var obj2 = { formatted_address: "null" };

        var obj = { eventTitle: "null", eventAddress: obj2, startDate: "null", endDate: "null", startTimeChosen: "null", endTimeChosen: "null" };
        this.setState({ selecteEvent: obj });

        if ((state.params.trip.events !== undefined)) {

            for (var i = 0; i < state.params.trip.events.length; i++) {

                this.state.events.push(state.params.trip.events[i]);



            }

            this.setState({ selecteEvent: state.params.trip.events[0] });
        }

        this.state.destinations.push(state.params.trip.destination2);


        this.setState({ latitude: state.params.trip.destination1.geometry.location.lat });
        this.setState({ longitude: state.params.trip.destination1.geometry.location.lng });
        this.setState({ trip: state.params.trip });

        // this.showAddress();
        this.showDirections();
        this.getCurrentPosition();



    }

    componentDidMount() {
        RevMobManager.startSession("5ac329b0a30c3b1c882e56fb", function revMobStartSessionCb(err){
            if(!err) RevMobManager.loadBanner();
        });
        NativeAppEventEmitter.addListener('onRevmobBannerDidReceive', () => {
            RevMobManager.showBanner(); // Show banner if it's loaded
        });
        RevMobManager.showBanner();
        const { state } = this.props.navigation;
        this.setState({ email: state.params.email });
        this.getCurrentPosition();
    }

    showDirections() {

        const { state } = this.props.navigation;

        if ((this.state.events.length !== 0)) {

            var obj = { d1: { latitude: state.params.trip.destination1.geometry.location.lat, longitude: state.params.trip.destination1.geometry.location.lng }, d2: { latitude: this.state.events[0].eventAddress.geometry.location.lat, longitude: this.state.events[0].eventAddress.geometry.location.lng } };
            this.state.coords.push(obj);

            for (var i = 0; i < this.state.events.length - 1; i++) {


                var obj = { d1: { latitude: this.state.events[i].eventAddress.geometry.location.lat, longitude: this.state.events[i].eventAddress.geometry.location.lng }, d2: { latitude: this.state.events[i + 1].eventAddress.geometry.location.lat, longitude: this.state.events[i + 1].eventAddress.geometry.location.lng } };
                this.state.coords.push(obj);

            }



            var obj2 = { d1: { latitude: this.state.events[this.state.events.length - 1].eventAddress.geometry.location.lat, longitude: this.state.events[this.state.events.length - 1].eventAddress.geometry.location.lng }, d2: { latitude: state.params.trip.destination2.geometry.location.lat, longitude: state.params.trip.destination2.geometry.location.lng } };


            this.state.coords.push(obj2);


        } else {

            var obj2 = { d1: { latitude: state.params.trip.destination1.geometry.location.lat, longitude: state.params.trip.destination1.geometry.location.lng }, d2: { latitude: state.params.trip.destination2.geometry.location.lat, longitude: state.params.trip.destination2.geometry.location.lng } };
            this.state.coords.push(obj2);


        }





    }


    getCurrentPosition() {

        navigator.geolocation.getCurrentPosition(
            (position) => {

            this.setState({
            userlatitude: position.coords.latitude,
            userlongitude: position.coords.longitude,
            error: null,
        });
        //  this.setState({ latitude:  position.coords.latitude });
        // this.setState({ longitude: position.coords.longitude});
    },
        (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
    }


    render() {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;

        // adding buttom components for all the user trips
        var MarkersComponents = this.state.destinations.map((type) => <MapView.Marker coordinate={{
            latitude: type.geometry.location.lat,

            longitude: type.geometry.location.lng
        }} title={type.name}
        />)

        var eventsMComponents = this.state.events.map((type) => <MapView.Marker coordinate={{
            latitude: type.eventAddress.geometry.location.lat,

            longitude: type.eventAddress.geometry.location.lng
        }} title={type.eventAddress.name}
            pinColor="blue"
            onPress={() => {
                this.setState({ selecteEvent: type });
                this.getEventInfo();
            }}
        />)


        var apikey1 = 'AIzaSyC5C7rjlNIxueS9wOSr_ayIv7upq3uoHIQ';

        var dirComponents = this.state.coords.map((type) => <MapViewDirections
        origin={type.d1}
        destination={type.d2}
        apikey={apikey1}
        strokeWidth={3}
        strokeColor="blue"
            />)

      


var userloc = <MapView.Marker coordinate={{
    latitude: this.state.userlatitude,
    longitude: this.state.userlongitude
}} title={"Your Location"}
image={userlocationIcon} >

</MapView.Marker>
return (
    <View style={styles.Container}>
        <View style={styles.adContainer}>
        </View>
        <StatusBar
                    //status bar fix
                    //backgroundColor="#000"
                    barStyle="dark-content"
                />

        <ActionBar
            containerStyle={styles.bar}
            title={state.params.trip.tripName}
            titleStyle={styles.title}
            backgroundColor={'#FFFFFF'}
            iconImageStyle={{ tintColor: "black" }}
            leftIconImage={require('../../images/profile.png')}
            onLeftPress={() => navigate('ProfileSettings', { email: state.params.email, trip: state.params.trip }, RevMobManager.hideBanner())}
            rightIcons={[
                {
                    image: require('../../images/timeline.png'), // To use a custom image
                    onPress: () => navigate('TimeLineScreen', { email: state.params.email, trip: state.params.trip }, RevMobManager.hideBanner()),
                }, {
                    image: require('../../images/settings.png'), // To use a custom image
                    onPress: () => navigate('AppSettings', { email: state.params.email }, RevMobManager.hideBanner())
                },

            ]}
        />
        <View style={styles.MapContainer}>
            <View style={styles.MapStyle}>
                <MapView prvoider={PROVIDER_GOOGLE} style={StyleSheet.absoluteFillObject} region={{

                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}>
                    {MarkersComponents}


                            {eventsMComponents}

                            {dirComponents}

                   
        {userloc}


    </MapView>

            </View>



        </View>


        <TouchableHighlight onPress={() => this.getTripInfo()} style={{ position: "absolute", bottom: 55, right: 10, height: 30, width: 30 }}>
            <Image style={{ position: "absolute", bottom: 0, right: 0, height: 30, width: 30 }} source={require('../../images/infobutton.png')} />
        </TouchableHighlight>

     
                        <TabNavigator style={{ position: "absolute", bottom: 0, right: 0, height: 30, width: "100%" }}>
                                <TabNavigator.Item
                                    selected={this.state.selectedTab === 'Chat'}
                                    title="Chat"
                                    renderIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/chat.png')} size={this.px2dp(15)} tintColor="#666" />}
                                    renderSelectedIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/chat.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                                    onPress={() => navigate('Chat', { email: this.state.email }, RevMobManager.hideBanner())}>
                                </TabNavigator.Item>

                                <TabNavigator.Item
                                    selected={this.state.selectedTab === 'home'}
                                    title="Home"
                                    renderIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/home.png')} size={this.px2dp(15)} tintColor="#666" />}
                                    renderSelectedIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/home.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                                    onPress={() => navigate('Home', { email: this.state.email }, RevMobManager.hideBanner())}>
                                </TabNavigator.Item>

                                <TabNavigator.Item
                                    selected={this.state.selectedTab === 'Share'}
                                    title="Share"
                                    renderIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/share.png')} size={this.px2dp(15)} tintColor="#666" />}
                                    renderSelectedIcon={() => <Image style={{width: 27, height: 27}} source={require('../../images/share.png')} size={this.px2dp(15)} tintColor="#3496f0" />}
                                    onPress={() => navigate('Share', { email: this.state.email }, RevMobManager.hideBanner())}>
                                </TabNavigator.Item>
                            </TabNavigator>




        <View style={styles.SecondContainer}>
            <Modal style={styles.ModalContainer}
                visible={this.state.modalVisible2}
                animationType={'slide'}
                onRequestClose={() => this.closeEventInfo()}>

                <View style={styles.infoContainer}>

                    <Text style={styles.titleInfoText}>Event Name</Text>
                    <Text style={styles.infoTextEvent}>{this.state.selecteEvent.eventTitle}</Text>

                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            paddingBottom: 10,
                        }}
                    />



                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.infoText1}>Event Address: </Text>
                        <Text style={styles.infoTextEvent}> {this.state.selecteEvent.eventAddress.formatted_address} </Text>
                    </View>



                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            paddingBottom: 10,
                        }}
                    />

                    <Text style={styles.infoText1}>Event Duration: </Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>


                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', }}>
                            <Text style={styles.timeText}> Start </Text>
                            <Text style={styles.infoText1}> Date:{this.state.selecteEvent.startDate} </Text>
                            <Text style={styles.infoText1}> Time:{this.state.selecteEvent.startTimeChosen} </Text>



                        </View>

                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', }}>
                            <Text style={styles.timeText}> End </Text>
                            <Text style={styles.infoText1}> Date: {this.state.selecteEvent.endDate} </Text>
                            <Text style={styles.infoText1}> Time: {this.state.selecteEvent.endTimeChosen} </Text>

                        </View>



                    </View>

                    <View style={styles.centerView}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => this.closeEventInfo()}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        </View>

        <View style={styles.SecondContainer}>


        <TouchableHighlight onPress={() => this.getTripInfo()} style={{ position: "absolute", bottom: 0, right: 0, height: 30, width: 30 }}>
    <Image style={{ position: "absolute", bottom: 0, right: 0, height: 30, width: 30 }} source={require('../../images/infobutton.png')} />
        </TouchableHighlight>

            <Modal style={styles.ModalContainer}
                visible={this.state.modalVisible}
                animationType={'slide'}
                onRequestClose={() => this.closeInfo()}>

                <View style={styles.infoContainer}>

                    <Text style={styles.titleInfoText}>Trip Info</Text>

                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            paddingBottom: 10,
                        }}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                        <Text style={styles.infoText1}>Group Total: </Text>
                        <Text style={styles.infoText2}> $300.12 </Text>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.infoText1}>My Total: </Text>
                        <Text style={styles.infoText2}> $101.66 </Text>
                    </View>

                    <Text style={styles.infoText3}> details </Text>

                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            paddingBottom: 10,
                        }}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                        <Text style={styles.infoText1}># Trip Members: </Text>
                        <Text style={styles.infoText2}> {this.state.trip.members.length} </Text>
                    </View>

                    <Text style={styles.infoText3}> details </Text>

                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            paddingBottom: 10,
                        }}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
                        <Text style={styles.infoText1}>Duration: </Text>

                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', }}>
                            <Text style={styles.timeText}> {this.state.days} </Text>
                            <Text style={styles.infoText1}> days </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', }}>
                            <Text style={styles.timeText}> {this.state.hours} </Text>
                            <Text style={styles.infoText1}> hours </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', }}>
                            <Text style={styles.timeText}> {this.state.mins} </Text>
                            <Text style={styles.infoText1}> mins </Text>
                        </View>
                    </View>

                    <View style={styles.centerView}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => this.closeInfo()}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        </View>

    </View>
)

    }



}


const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        color: 'black',
        fontWeight: '700'
    },
    adContainer:{
        width: '100%',
        height: '10%',
        backgroundColor: '#FFF'
    },
    buttonStyle: {
        backgroundColor: 'rgb(0,25,88)',
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10
    },
    centerView: {
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '100',
        //paddingTop: 10,
    },
    infoContainer: {
        flex: 0,
        height: '50%',
        width: '100%',
        paddingRight: 40,
        paddingLeft: 40,
        backgroundColor: 'white',

    },
    titleInfoText: {
        textAlign: 'center',
        color: 'rgb(128,128,128)',
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 30,
        paddingTop: 10,
    },
    infoText1: {
        textAlign: 'center',
        color: 'rgb(128,128,128)',
        fontWeight: 'normal',
        fontSize: 10,
    },
    infoText2: {
        color: '#000',
        fontWeight: 'normal',
        fontSize: 16,
    },
    infoText3: {
        color: '#000',
        fontWeight: 'normal',
        fontSize: 14,
        textAlign: 'center',
    },
    timeText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
    Container: {
        flex: 1,
    },
    MapContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    MapStyle: {
        height: '100%',
        width: '100%',
    },

    modalContainer: {
        flex: 0,
        position: 'absolute',
        left: 0,
        top: 0,
        height: '50%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
        // paddingRight: 40,
        // paddingLeft: 40,
    },
    infoTextEvent:{
        color: '#000',
        fontWeight: 'normal',
        fontSize: 14,
        textAlign: 'center',

    }

});