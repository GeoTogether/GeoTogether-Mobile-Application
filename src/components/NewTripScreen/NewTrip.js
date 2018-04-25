import React from 'react';
import {
    StyleSheet, View, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView,
    Alert, Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    StackNavigator
} from 'react-navigation';
import firebase from '../Firebase/firebaseStorage';
import DatePicker from 'react-native-datepicker';
import Modal from "react-native-modal";
import DateTimePicker from 'react-native-modal-datetime-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Mailer from 'react-native-mail';
import SendSMS from 'react-native-sms';
import {RevMobManager} from "react-native-revmob";

var SendIntentAndroid = require('react-native-send-intent');

export default class NewTrip extends React.Component {

    static navigationOptions = {
        header: null
    }
    // the user state with all of the user information
    state = {
        destination1: null,
        destination2: null,
        authenticating: false,
        user: null,
        error: '',
        tripname: '',
        members: [],
        events: [],
        member: '',
        startDate: null,
        endDate: null,
        email: '',
        UserInvite: '',
        modalVisible: false,
        modalEvent: false,
        eventTitle: '',
        eventAddress: '',
        text: '',
    };
    _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});
    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});
    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
    };

    componentDidMount(){
        RevMobManager.hideBanner()
    }



    constructor(props) {
        super(props)
    }

    componentWillMount() {

        const {state} = this.props.navigation;

        this.setState({email: state.params.email});

        if ((state.params.trip !== undefined)) {

            this.setState({tripname: state.params.trip.tripname})
            this.setState({destination1: state.params.trip.destination1})
            this.setState({destination2: state.params.trip.destination2})
            this.setState({startDate: state.params.trip.startDate})
            this.setState({endDate: state.params.trip.endDate})
            for (var i = 0; i < state.params.trip.members.length; i++) {


                this.state.members.push(state.params.trip.members[i])
            }

            for (var j = 0; j < state.params.trip.events.length; j++) {

                this.state.events.push(state.params.trip.events[j]);

            }


        }


    }

    openModal() {
        this.setState({modalVisible: true});
    }

    closeModal() {
        this.setState({modalVisible: false});
    }

    openEvent() {
        const {navigate} = this.props.navigation;

        var tripinfo = {
            tripname: this.state.tripname,
            destination1: this.state.destination1,
            destination2: this.state.destination2,
            email: this.state.email,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            events: this.state.events,
            members: this.state.members
        }

        if(this.state.tripname == '' || this.state.destination1 == null || this.state.destination2 == null || this.state.startDate == null || this.state.endDate == null) {
            alert("Please fill out all fields in creating the trip before creating an event.");
        }

        else {
            if(this.state.startDate <= this.state.endDate) {
                navigate('NewEvent', {email: this.state.email, trip: tripinfo});
            }
            else {
                alert("Your trip start date must be earlier than your trip end date.");
            }

        }

    }


    // function to create a new trip using firebase database
    onPressNewTrip() {
        const {navigate} = this.props.navigation;
        const {tripname, destination1, destination2, members, email, startDate, endDate, events} = this.state;

        if(tripname == '' || destination1 == null || destination2 == null || startDate == null || endDate == null) {
            alert("Please fill out all fields.");
        }

        else {
            if(startDate <= endDate) {
                members.push(email);


                // add the the trip to the database
                firebase.database().ref('trips/').push({
                    tripName: tripname,
                    admin: email,
                    startDate: startDate,
                    endDate: endDate,
                    destination1: destination1,
                    destination2: destination2,
                    members: members,
                    events: events
                });


                //after adding the trip go back to trips
                navigate('Home', {email: this.state.email});
            }
            else {
                alert("Your trip start date must be earlier than your trip end date.");
            }

        }
    }

    render() {
        const {navigate} = this.props.navigation;
        const {goBack} = this.props.navigation;

        return (
            <View style={styles.container}>
   <View style={styles.backButtonContainer}>
                    <TouchableOpacity onPress={() => goBack()} style={styles.back} >
                        <Image source={require('../../images/backarrow.png')}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.childContainer}>
                    <View style={styles.tripNameInputContainer}>
                        <View style={styles.tripNameContainer}>
                            <Text style={styles.textHeader}>Name of Trip</Text>
                            <TextInput
                                placeholder="ex. Spring Break 2018"
                                value={this.state.tripname}
                                returnKeyType="done"
                                autoCapitalize="words"
                                autoCorrect={true}
                                style={styles.input}
                                onChangeText={tripname => this.setState({tripname})} // gets the trip name
                            />
                        </View>
                    </View>

                    <View style={styles.durationChoseContainer}>
                        <Text style={styles.textHeader}>Duration</Text>
                        <View style={styles.durationContainer}>
                            <DatePicker
                                style={{
                                    width: '30%',
                                    height: '60%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    paddingBottom: 10
                                }}
                                date={this.state.startDate}
                                showIcon={false}
                                mode="date"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                value={this.state.startDate}
                                placeholder="Start Date"
                                format="YYYY-MM-DD"
                                customStyles={styles.durationInput}
                                onDateChange={(startdate) => {
                                    this.setState({startDate: startdate}), this.placeholder = startdate
                                }}
                            />
                            <Text style={styles.middleText}>to</Text>
                            <DatePicker
                                style={{
                                    width: '30%',
                                    height: '60%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    paddingBottom: 10
                                }}
                                date={this.state.endDate}
                                showIcon={false}
                                mode="date"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                placeholder="End Date"
                                format="YYYY-MM-DD"
                                value={this.state.endDate}
                                customStyles={styles.durationInput}
                                onDateChange={(enddate) => {
                                    this.setState({endDate: enddate}), this.placeholder = enddate
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.startLContainment}>
                        <View style={styles.startLocationContainer}>
                            <Text style={styles.textHeader}>Start Location</Text>
                            <KeyboardAvoidingView style={styles.container} behavior="padding">
                                <GooglePlacesAutocomplete
                                    placeholder="ex. Tempe, AZ"
                                    minLength={2}
                                    autoFocus={false}
                                    returnKeyType={'default'}
                                    fetchDetails={true}
                                    styles={{
                                        textInputContainer: {
                                            backgroundColor: 'rgba(0,0,0,0)',
                                            borderTopWidth: 0,
                                            borderBottomWidth: 0,
                                        },
                                        textInput: {
                                            marginLeft: 0,
                                            marginRight: 0,
                                            height: '100%',
                                            width: '100%',
                                            color: '#5d5d5d',
                                            fontSize: 16,
                                        },
                                        predefinedPlacesDescription: {
                                            color: '#1faadb'
                                        },
                                    }}
                                    currentLocation={false}
                                    query={{
                                        key: ' AIzaSyAUdubBvZ7sDgU2ye17YHpuJo-OPjM4EzE',
                                        language: 'en', // language of the results
                                        origin: 'http://mywebsite.com'
                                    }}
                                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true

                                   // var temp = {address: data.description, id: data.place_id}
                                    this.setState({destination1: details})
                                       
                                    }}
                                />
                            </KeyboardAvoidingView>
                        </View>
                    </View>

                    <View style={styles.endLContainment}>
                        <View style={styles.endLocationContainer}>
                            <Text style={styles.textHeader}>End Location</Text>
                            <GooglePlacesAutocomplete
                                placeholder='ex. Tempe, AZ'
                                minLength={2}
                                autoFocus={false}
                                returnKeyType={'default'}
                                fetchDetails={true}
                                onChangeText={(text) => this.setState({text})}
                                styles={{
                                    textInputContainer: {
                                        backgroundColor: 'rgba(0,0,0,0)',
                                        borderTopWidth: 0,
                                        borderBottomWidth: 0
                                    },
                                    textInput: {
                                        marginLeft: 0,
                                        marginRight: 0,
                                        height: '100%',
                                        width: '100%',
                                        color: '#5d5d5d',
                                        fontSize: 16,
                                    },
                                    predefinedPlacesDescription: {
                                        color: '#1faadb'
                                    },
                                }}
                                currentLocation={false}
                                query={{
                                    key: ' AIzaSyAUdubBvZ7sDgU2ye17YHpuJo-OPjM4EzE',
                                    language: 'en', // language of the results
                                    origin: 'http://mywebsite.com'
                                }}
                                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true

                              //  var temp = {address: data.description, id: data.place_id}
                                this.setState({destination2: details})
                               
                               
                                   
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.addContiner}>
                        <View style={styles.addFuncContainer}>
                            <TouchableOpacity onPress={() => this.openEvent()}>
                                <Text style={styles.splitText}>+ ADD EVENT</Text>
                            </TouchableOpacity>

                         
                        </View>
                    </View>

                    <View style={styles.createBContainer}>
                        <View style={styles.createBStyle}>
                            <TouchableOpacity onPress={() => this.onPressNewTrip()}>
                                <Text style={styles.buttonText}>CREATE TRIP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

          

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    back:{
        marginLeft: 20
    },
    childContainer: {
        flex: 1,
        marginTop: '13%',
        marginBottom: '15%',
        marginLeft: '5%',
        marginRight: '5%',
    },
    textHeader: {
        color: '#7a7a7a',
        fontWeight: 'bold'
    },
    container2: {
        // paddingTop: 10
    },
    input: {
        height: '100%',
        width: '70%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 10,
    },
    durationInput: {
        height: 50,
        width: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    buttonContainer: {
        backgroundColor: 'rgb(0,25,88)',
        paddingVertical: 15
    },
    splitContainer: {
        marginBottom: 20,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '100',
        fontSize: 20

    },
    splitText: {
        textAlign: 'left',
        color: 'rgb(0,25,88)',
        fontWeight: 'normal',
        fontSize: 20,
        paddingBottom: 5
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 350
    },
    innerContainer: {
        backgroundColor: "#b4b4b4",
        padding: 20,
        borderRadius: 4,
        borderColor: "#ffa53f"
    },
    newTitleContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    newEInput: {
        //width: '100%',
        height: 50,
        //alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        // borderRadius: 10
    },
    newEContainer: {
        flex: 1,
        //width:
    },
    tripNameInputContainer: {
        height: '10%',
        // paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    tripNameContainer: {
        flex: 1
    },
    durationChoseContainer: {
        height: '25%',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    durationContainer: {
        flex: 2,
        flexDirection: 'row',
        // paddingTop: 10
    },
    middleText: {
        textAlign: 'center',
        color: 'grey',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 15,
        fontSize: 20
    },
    startLContainment: {
        height: '23%',
        paddingLeft: 20,
        paddingRight: 20,

    },
    startLocationContainer: {
        flex: 1
    },
    endLContainment: {
        height: '23%',
        paddingLeft: 20,
        paddingRight: 20
    },
    endLocationContainer: {
        flex: 1
    },
    addContiner: {
        height: '9%',
        paddingLeft: 20,
        paddingRight: 20
    },
    addFuncContainer: {
        flex: 1
    },
    createBContainer: {
        height: '10%',
        marginTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    createBStyle: {
        flex: 1,
        backgroundColor: 'rgb(0,25,88)',
        height: '90%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6
    },
    inviteContainer: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    back:{
        marginLeft: 10,
        paddingTop: 15
      },
      backButtonContainer: {
        height: '5%'
      },
});

