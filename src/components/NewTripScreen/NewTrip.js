import React from 'react';
import {
    StyleSheet, View, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    StackNavigator
} from 'react-navigation';
import firebase from '../Firebase/firebaseStorage';
import DatePicker from 'react-native-datepicker';
import Modal from "react-native-modal";
import DateTimePicker from 'react-native-modal-datetime-picker';


var SendIntentAndroid = require('react-native-send-intent');

export default class NewTrip extends React.Component {

    static navigationOptions = {
        header: null
    }
    // the user state with all of the user information
    state = {
        destination1: '',
        destination2: '',
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
    };

    isChecked = false;

    _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
    };

    sendEmail = () => {

        SendIntentAndroid.sendMail(this.state.email, "Invitation to join " + this.state.tripname,
            "Hey there! I hope you can accept this invite to join this amazing trip.\n\n"
            + this.state.tripname + " starts on the " + this.state.startDate);

        this.closeModal();

    };
    sendSMS = () => {

        SendIntentAndroid.sendMail(this.state.email, "Invitation to join " + this.state.tripname,
            "Hey there! I hope you can accept this invite to join this amazing trip.\n\n"
            + this.state.tripname + " starts on the " + this.state.startDate);

        SendIntentAndroid.sendText({
            title: 'Invitation to join ' + this.state.tripname,
            text: "Hey there! I hope you can accept this invite to join this amazing trip.\n\n" +
            this.state.tripname + " starts on the " + this.state.startDate + "\n\nPlease be sure to accept soon!",
            type: SendIntentAndroid.TEXT_PLAIN
        });

        this.closeModal();

    };

    constructor(props) {
        super(props)
    }

    // showAlert = () => {
    //     this.state.members.push(this.state.UserInvite);
    //
    //     Alert.alert(
    //         this.state.UserInvite + ' has been added to the trip'
    //     )
    // }

    componentWillMount() {
        const { state } = this.props.navigation;
        this.setState({ email: state.params.email });
    }
    
    openModal() {
        this.setState({modalVisible: true});
    }

    closeModal() {
        this.setState({modalVisible: false});
    }

    openEvent() {
        this.setState({modalEvent: true});
    }

    closeEvent() {
        this.setState({modalEvent: false});
    }

    onPressNewEvent() {
        const {eventTitle, eventAddress} = this.state;

        var obj = {title: eventTitle, address: eventAddress};
        this.state.events.push(obj);

        this.closeEvent();

    }


    // function to create a new trip using firebase database
    onPressNewTrip() {
        const {navigate} = this.props.navigation;
        const {tripname, destination1, destination2, members, email, startDate, endDate, events} = this.state;


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
        navigate('Trips', {email: this.state.email});
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <View style={styles.childContainer}>

                    <View style={styles.tripNameInputContainer}>
                        <View style={styles.tripNameContainer}>
                            <Text style={styles.textHeader}>Name of Trip</Text>
                            <TextInput
                                placeholder="ex. Spring Break 2018"
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
                                placeholder="End Date"
                                format="YYYY-MM-DD"
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
                            <TextInput
                                placeholder="ex. Tempe, AZ"
                                returnKeyType="done"
                                autoCapitalize="words"
                                autoCorrect={true}
                                style={styles.input}
                                onChangeText={destination1 => this.setState({destination1})}
                            />
                        </View>
                    </View>

                    <View style={styles.endLContainment}>
                        <View style={styles.endLocationContainer}>
                            <Text style={styles.textHeader}>End Location</Text>
                            <TextInput
                                placeholder="ex. Tempe, AZ"
                                returnKeyType="done"
                                autoCapitalize="words"
                                autoCorrect={true}
                                style={styles.input}
                                onChangeText={destination2 => this.setState({destination2})}
                            />
                        </View>
                    </View>

                    <View style={styles.addContiner}>
                    <View style={styles.addFuncContainer}>
                    <TouchableOpacity onPress={() => this.openEvent()}>
                    <Text style={styles.splitText}>+ ADD EVENT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.openModal()}>
                    <Text style={styles.splitText}>+ ADD MEMBERS</Text>
                    </TouchableOpacity>
                    </View>
                    </View>

                    <View style={styles.createBContainer}>
                        <View style={styles.createBStyle}>
                            <TouchableOpacity  onPress={() => this.onPressNewTrip()}>
                                <Text style={styles.buttonText}>CREATE TRIP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        // style={styles.buttonContainer}
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    childContainer: {
        flex: 1,
        marginTop: '15%',
        marginBottom: '15%',
        marginLeft: '5%',
        marginRight: '5%'
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
        paddingBottom: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 350,
    },
    innerContainer: {
        backgroundColor: '#fffaf0',
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
        paddingTop: 30,
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
        height: '10%',
        paddingLeft: 20,
        paddingRight: 20,

    },
    startLocationContainer: {
        flex: 1
    },
    endLContainment: {
        height: '10%',
        marginTop: 40,
        paddingLeft: 20,
        paddingRight: 20
    },
    endLocationContainer: {
        flex: 1
    },
    addContiner:{
        height: '10%',
        marginTop: 25,
        paddingLeft: 20,
        paddingRight: 20
    },
    addFuncContainer: {
        flex: 1
    },
    createBContainer:{
        height: '10%',
        marginTop: 35,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center'

    },
    createBStyle:{
        flex: 1,
        backgroundColor: 'rgb(0,25,88)',
        height: '90%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6
    }
});
