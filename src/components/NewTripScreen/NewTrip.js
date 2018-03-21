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
    }

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

    // componentWillMount() {
    //
    //     const { state } = this.props.navigation;
    //     this.setState({ email: state.params.email });
    //
    // }
    //
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

        var newEventDisplay =

            <LinearGradient colors={['#00B4AB', '#FE7C00']}>
                <View style={styles.newEContainer}>
                <View style={styles.newTitleContainer}>
                    <Text style={styles.textHeader}>Title of the event</Text>
                    <TextInput
                        placeholder="ex. Breakfast"
                        returnKeyType="done"
                        autoCapitalize="words"
                        autoCorrect={true}
                        style={styles.newEInput}
                        onChangeText={eventTitle => this.setState({eventTitle})} // gets the trip name
                    />
                {/*</View>*/}

                {/*<View style={styles.tripNameContainer}>*/}
                    <Text style={styles.textHeader}>Address of the event</Text>
                    <TextInput
                        placeholder="ex. ASU"
                        returnKeyType="done"
                        autoCapitalize="words"
                        autoCorrect={true}
                        style={styles.newEInput}
                        onChangeText={eventAddress => this.setState({eventAddress})} // gets the trip name
                    />
                </View>

                {/*<View style={styles.durationContainer}>*/}
                    {/*<DatePicker*/}
                        {/*style={{*/}
                            {/*width: 200, backgroundColor: 'rgba(255, 255, 255, 0.7)',*/}
                            {/*marginBottom: 20,*/}
                            {/*paddingHorizontal: 10*/}
                        {/*}}*/}
                        {/*date={this.state.startDate}*/}
                        {/*showIcon={false}*/}
                        {/*mode="date"*/}
                        {/*placeholder="Start Date"*/}
                        {/*format="YYYY-MM-DD"*/}
                        {/*customStyles={styles.durationInput}*/}
                        {/*onDateChange={(startdate) => {*/}
                            {/*this.setState({startDate: startdate}), this.placeholder = startdate*/}
                        {/*}}*/}
                    {/*/>*/}
                    {/*<DatePicker*/}
                        {/*style={{*/}
                            {/*width: 200, backgroundColor: 'rgba(255, 255, 255, 0.7)',*/}
                            {/*marginBottom: 20,*/}
                            {/*paddingHorizontal: 10*/}
                        {/*}}*/}
                        {/*date={this.state.endDate}*/}
                        {/*showIcon={false}*/}
                        {/*mode="date"*/}
                        {/*placeholder="End Date"*/}
                        {/*format="YYYY-MM-DD"*/}
                        {/*customStyles={styles.durationInput}*/}
                        {/*onDateChange={(enddate) => {*/}
                            {/*this.setState({endDate: enddate}), this.placeholder = enddate*/}
                        {/*}}*/}
                    {/*/>*/}
                    {/*<TouchableOpacity onPress={this._showDateTimePicker}>*/}
                        {/*<Text>Start Time</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<DateTimePicker*/}
                        {/*isVisible={this.state.isDateTimePickerVisible}*/}
                        {/*onConfirm={this._handleDatePicked}*/}
                        {/*onCancel={this._hideDateTimePicker}*/}
                        {/*mode="time"*/}
                        {/*is24Hour={false}*/}
                    {/*/>*/}
                    {/*<TouchableOpacity onPress={this._showDateTimePicker}>*/}
                        {/*<Text>End Time</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<DateTimePicker*/}
                        {/*isVisible={this.state.isDateTimePickerVisible}*/}
                        {/*onConfirm={this._handleDatePicked}*/}
                        {/*onCancel={this._hideDateTimePicker}*/}
                        {/*mode="time"*/}
                        {/*is24Hour={false}*/}
                    {/*/>*/}
                {/*</View>*/}
                </View>
            </LinearGradient>


        return (
            <View style={styles.container}>

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

                <View style={styles.durationContainer}>
                    <Text style={styles.textHeader}>Duration</Text>
                    <DatePicker
                        style={{
                            width: 200, backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            marginBottom: 20,
                            paddingHorizontal: 10
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
                    <DatePicker
                        style={{
                            width: 200, backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            marginBottom: 20,
                            paddingHorizontal: 10
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

                <View style={styles.addFuncContainer}>
                    <TouchableOpacity onPress={() => this.openEvent()}>
                        <Text style={styles.splitText}>+ ADD EVENT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.openModal()}>
                        <Text style={styles.splitText}>+ ADD MEMBERS</Text>
                    </TouchableOpacity>
                </View>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container2}>

                        <Modal
                            visible={this.state.modalVisible}
                            animationType={'slide'}
                            onRequestClose={() => this.closeModal()}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.innerContainer}>
                                    <Text>Please select a method of invitation</Text>

                                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.sendSMS()}>
                                        <Text style={styles.buttonText}>Send SMS Invite</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.buttonContainer}
                                                      onPress={() => this.sendEmail()}>
                                        <Text style={styles.buttonText}>Send Email Invite</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.buttonContainer}
                                                      onPress={() => this.closeModal()}>
                                        <Text style={styles.buttonText}>Back To Trip View</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>


                        <Modal
                            visible={this.state.modalEvent}
                            animationType={'slide'}
                            onRequestClose={() => this.closeEvent()}
                        >
                            {/*<View style={styles.modalContainer}>*/}
                                {/*<View style={styles.innerContainer}>*/}

                                    <View style={styles.newEContainer}>
                                        {newEventDisplay}


                                    <TouchableOpacity style={styles.buttonContainer}
                                                      onPress={() => this.onPressNewTrip()}>
                                        <Text style={styles.buttonText}>Add Event</Text>
                                    </TouchableOpacity>


                                    <TouchableOpacity style={styles.buttonContainer}
                                                      onPress={() => this.onPressNewEvent()}>
                                        <Text style={styles.buttonText}>CREATE Event</Text>
                                    </TouchableOpacity>
                                    </View>
                                {/*</View>*/}
                            {/*</View>*/}
                        </Modal>


                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressNewTrip()}>
                            <Text style={styles.buttonText}>CREATE TRIP</Text>
                        </TouchableOpacity>

                    </View>
                </TouchableWithoutFeedback>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tripNameContainer: {
        flex: 1,
    },
    textHeader: {
        color: '#000eff'
    },
    durationContainer: {
        flex: 2
    },
    startLocationContainer: {
        flex: 1
    },
    endLocationContainer: {
        flex: 1
    },
    addFuncContainer: {
        flex: 1
    },
    container2: {
        paddingTop: 10
    },
    input: {
        height: 50,
        width: 350,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 10,
        paddingHorizontal: 10
    },
    durationInput: {
        height: 50,
        width: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 20,
        paddingHorizontal: 10,
        flexDirection: 'row'
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
        fontWeight: 'bold'
    },
    splitText: {
        textAlign: 'left',
        color: 'rgb(0,25,88)',
        fontWeight: 'bold',
        fontSize: 20,
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
    newTitleContainer:{
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
    }
});