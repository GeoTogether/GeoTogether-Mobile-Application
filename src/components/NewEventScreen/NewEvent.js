import React from 'react';
import {
    StyleSheet, View, TextInput, TouchableOpacity, Text, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    StackNavigator
} from 'react-navigation';
import firebase from '../Firebase/firebaseStorage';
import DatePicker from 'react-native-datepicker';
import Modal from "react-native-modal";
import DateTimePicker from 'react-native-modal-datetime-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
        eventAddress: null,
        startTimeChosen:'00:00',
        endTimeChosen: '00:00',
        isDateTimePickerVisible: false,
        isDateTimePickerVisible2: false,
    };

    _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    _showDateTimePicker2 = () => this.setState({isDateTimePickerVisible2: true});

    _hideDateTimePicker2 = () => this.setState({isDateTimePickerVisible2: false});

    _handleDatePicked = (date) => {
       

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var period;

    if (hours > 12) {
        hours -= 12;
        period = ' PM'
    } else if (hours === 0) {
        hours = 12;
        period = ' AM'
    }else if(hours < 12){

        period = ' AM';


    }else if(hours === 12){


        period = ' PM'

    }

    var todisplay = hours.toString() + ':' + minutes.toString()+ period;

        this.setState({startTimeChosen: todisplay});
        this._hideDateTimePicker();
    };

    _handleDatePicked2 = (date) => {
        
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var period;

    if (hours > 12) {
        hours -= 12;
        period = ' PM'
    } else if (hours === 0) {
        hours = 12;
        period = ' AM'
    }else if(hours < 12){

        period = ' AM';


    }else if(hours === 12){


        period = ' PM'

    }

    var todisplay = hours.toString() + ':' + minutes.toString()+ period;

        this.setState({endTimeChosen: todisplay});
        this._hideDateTimePicker2();
    };


    constructor(props) {
        super(props)
    }

    onPressNewEvent(){
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        var newEvent = {eventTitle: this.state.eventTitle, eventAddress: this.state.eventAddress, startDate: this.state.startDate, endDate: this.state.endDate, startTimeChosen: this.state.startTimeChosen, endTimeChosen: this.state.endTimeChosen}
   
        state.params.trip.events.push(newEvent);
        navigate('NewTrip', {email: state.params.email, trip: state.params.trip})
   
    }

    render() {

        const {navigate} = this.props.navigation;
        const {goBack} = this.props.navigation;

        return (

            <LinearGradient colors={['#00B4AB', '#FE7C00']} style={styles.linearGradient}>
                <View>
                    <TouchableOpacity onPress={() => goBack()} style={styles.back} >
                        <Image source={require('../../images/backarrow.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.newTitleContainer}>
                    <Text style={styles.textHeader}>Title of the event:</Text>
                    <TextInput
                        placeholder="ex. Breakfast"
                        underlineColorAndroid="transparent"
                        returnKeyType="done"
                        autoCapitalize="words"
                        autoCorrect={true}
                        style={styles.newEInput}
                        onChangeText={eventTitle => this.setState({eventTitle})} // gets the trip name
                    />
                    <Text style={styles.textHeader}>Address of the event:</Text>
                    <GooglePlacesAutocomplete
                        placeholder='ex. Tempe, AZ'
                        minLength={2}
                        autoFocus={false}
                        returnKeyType={'default'}
                        fetchDetails={true}
                        styles={{
                            textInputContainer: {
                                backgroundColor: 'rgba(0,0,0,0)',
                                borderTopWidth: 0,
                                borderBottomWidth: 0,
                                width: '90%',
                            },
                            textInput: {
                                width: '90%',
                                backgroundColor: 'white',
                                borderRadius: 30
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
                        // firebase.database().ref('test/').push(data);
                        // firebase.database().ref('test/').push(details);
                        // var temp = {address: data.description, id: data.place_id}
                        this.setState({eventAddress: details})
                           
                        }}
                    />
                </View>

                <View style={styles.durationContainer}>
                    <View style={styles.dateStartContainer}>
                        <View style={styles.dateStartStyle}>
                            <Text style={styles.textHeader}>Start Date:</Text>
                            <DatePicker
                                date={this.state.startDate}
                                style={{backgroundColor: 'white'}}
                                showIcon={false}
                                mode="date"
                                placeholder="YYYY-MM-DD"
                                format="YYYY-MM-DD"
                                customStyles={styles.durationInput}
                                onDateChange={(startdate) => {
                                    this.setState({startDate: startdate}), this.placeholder = startdate
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.dateStartContainer}>
                        <View style={styles.dateStartStyle}>
                            <Text style={styles.textHeader}>End Date:</Text>
                            <DatePicker
                                date={this.state.endDate}
                                style={{backgroundColor: 'white'}}
                                showIcon={false}
                                mode="date"
                                placeholder="YYYY-MM-DD"
                                format="YYYY-MM-DD"
                                customStyles={styles.durationInput}
                                onDateChange={(enddate) => {
                                    this.setState({endDate: enddate}), this.placeholder = enddate
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.timeContainer}>
                        <View style={styles.timeStyle}>
                            <Text style={styles.textHeader}>Start Time:</Text>
                            <TouchableOpacity onPress={this._showDateTimePicker}>
                                <View style={styles.timeSlot}>
                                    <Text style={styles.timeDisplay}>{this.state.startTimeChosen}</Text>
                                </View>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this._handleDatePicked}
                                    onCancel={this._hideDateTimePicker}
                                    mode="time"
                                    is24Hour={false}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.timeContainer}>
                        <View style={styles.timeStyle}>
                            <Text style={styles.textHeader}>End Time:</Text>
                            <TouchableOpacity onPress={this._showDateTimePicker2}>
                                <View style={styles.timeSlot}>
                                    <Text style={styles.timeDisplay}>{this.state.endTimeChosen}</Text>
                                </View>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible2}
                                    onConfirm={this._handleDatePicked2}
                                    onCancel={this._hideDateTimePicker2}
                                    mode="time"
                                    is24Hour={false}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonStyle}>
                        <TouchableOpacity onPress={() => this.onPressNewEvent()}>
                            <Text style={styles.buttonText}>Add Event</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>

        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    textHeader: {
        color: 'white',
        paddingTop: 20,
        paddingBottom: 20,
    },
    durationContainer: {
        height: '45%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 20,
        paddingRight: 20

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
    splitContainer: {
        marginBottom: 20,
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
    newTitleContainer: {
        height: '40%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 20
    },
    newEInput: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 3
    },
    dateInputStyle: {
        backgroundColor: 'white',
    },
    dateHeaderContainer: {
        flexDirection: 'row',
        paddingTop: 100,
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    durationStartContainer: {
        flex: 2,
        paddingTop: 50,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 20
    },
    dateStartContainer: {
        width: '50%',
        height: '50%',
        padding: 2,
    },
    dateStartStyle: {
        flex: 1,
    },
    timeContainer: {
        width: '50%',
        height: '50%',
        padding: 2,
    },
    timeStyle: {
        flex: 1,
    },
    timeSlot: {
        backgroundColor: 'white',
        color: 'black',
        height: 40,
        width: 140
    },
    timeDisplay: {
        paddingTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        height: '15%',
        flexDirection: 'row',
        paddingTop: 5,
        paddingLeft: '25%',
        paddingRight: '25%'
    },
    buttonStyle: {
        width: '50%',
        height: '70%',
        flex:1,
        backgroundColor: 'rgb(0,25,88)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'normal'
    }
});