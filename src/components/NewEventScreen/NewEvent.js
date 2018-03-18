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

export default class NewEvent extends React.Component {

    static navigationOptions = {
        header: null
    };

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

    _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
    };


    constructor(props) {
        super(props)
    }


    render() {

        const {navigate} = this.props.navigation;

        return (

            <LinearGradient colors={['#00B4AB', '#FE7C00']} style={styles.linearGradient}>
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
                {/*</View>*/}
            </LinearGradient>

        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
       // alignItems: 'center',
        //justifyContent: 'center'
    },
    textHeader: {
        color: 'white',
        paddingTop: 20,
        paddingBottom: 20,
        //alignItems: 'flex-start'
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
    newTitleContainer:{
        flex: 1,
        flexDirection: 'column',
        //justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingLeft: 20
    },
    newEInput: {
        width: '90%',
        height: 50,
        ///alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        // borderRadius: 10
    }
});