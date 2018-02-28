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


var SendIntentAndroid = require('react-native-send-intent');

export default class NewTrip extends React.Component {

    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        header: null
    }

    // the user state with all of the user information 
    state = {
        destinations: [],
        destination1: '',
        destination2: '',
        authenticating: false,
        user: null,
        error: '',
        tripname: '',
        members: [],
        member: '',
        startDate: null,
        endDate: null,
        email: '',
        UserInvite: '',
        modalVisible: false,
    }

    openModal() {
        this.setState({ modalVisible: true });
    }

    closeModal() {
        this.setState({ modalVisible: false });
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



    // function to create a new trip using firebase database
    onPressNewTrip() {
        const { navigate } = this.props.navigation;
        const { tripname, destinations, members, email, startDate, endDate } = this.state;



        destinations.push(this.state.destination1);
        destinations.push(this.state.destination2);


        members.push(email);



        // add the the trip to the database
        firebase.database().ref('trips/').push({
            tripName: tripname,
            admin: email,
            startDate: startDate,
            endDate: endDate,
            destinations: destinations,
            members: members
        });



        //after adding the trip go back to trips
        navigate('Trips', { email: this.state.email });


    }

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




    render() {
        const { navigate } = this.props.navigation;



        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.formContainer}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={styles.container2}>

                            <Modal
                                visible={this.state.modalVisible}
                                animationType={'slide'}
                                onRequestClose={() => this.closeModal()}
                            >

                                {/*<View style={styles.modalContainer}>*/}
                                    {/*<View style={styles.innerContainer}>*/}
                                        {/*<Text>Please Input Which Users You Want To Add Below</Text>*/}
                                        {/*<TextInput*/}
                                            {/*style={{ height: 40 }}*/}
                                            {/*placeholder="Email Address:"*/}
                                            {/*onChangeText={(UserInvite) => this.setState({ UserInvite })}*/}
                                        {/*/>*/}

                                        {/*<TouchableOpacity style={styles.buttonContainer} onPress={() => this.showAlert()} >*/}
                                            {/*<Text style={styles.buttonText}>Invite User</Text>*/}
                                        {/*</TouchableOpacity>*/}

                                        {/*<TouchableOpacity style={styles.buttonContainer} onPress={() => this.closeModal()} >*/}
                                            {/*<Text style={styles.buttonText}>Back To Trip View</Text>*/}
                                        {/*</TouchableOpacity>*/}

                                    {/*</View>*/}
                                <View style={styles.modalContainer}>
                                    <View style={styles.innerContainer}>
                                        <Text>Please select a method of invitation</Text>

                                        <TouchableOpacity  onPress={() => this.sendSMS()}>
                                            <Image source={require('../../images/sms.png')} />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                                          onPress={() => this.sendEmail()}>
                                            <Image source={require('../../images/email.png')} />
                                        </TouchableOpacity>

                                        <TouchableOpacity  onPress={() => this.closeModal()} >
                                            <Image source={require('../../images/cancel.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>


                            <Text style={styles.splitText}>Name of Trip</Text>
                            <TextInput
                                placeholder="ex. Spring Break 2018"
                                returnKeyType="done"
                                autoCapitalize="words"
                                autoCorrect={true}
                                style={styles.input}
                                onChangeText={tripname => this.setState({ tripname })} // gets the trip name
                            />

                            <Text style={styles.splitText}>Duration</Text>

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
                                onDateChange={(startdate) => { this.setState({ startDate: startdate }), this.placeholder = startdate }}
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
                                onDateChange={(enddate) => { this.setState({ endDate: enddate }), this.placeholder = enddate }}
                            />


                            <Text style={styles.splitText}>Start Location</Text>
                            <TextInput
                                placeholder="ex. Tempe, AZ"
                                returnKeyType="done"
                                autoCapitalize="words"
                                autoCorrect={true}
                                style={styles.input}
                                onChangeText={destination1 => this.setState({ destination1 })}
                            />

                            <Text style={styles.splitText}>End Location</Text>
                            <TextInput
                                placeholder="ex. Tempe, AZ"
                                returnKeyType="done"
                                autoCapitalize="words"
                                autoCorrect={true}
                                style={styles.input}
                                onChangeText={destination2 => this.setState({ destination2 })}
                            />

                            <TouchableOpacity>
                                <Text style={styles.splitText}>+ ADD EVENT</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.openModal()}>
                                <Text style={styles.splitText}>+ ADD MEMBERS</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressNewTrip()} >
                                <Text style={styles.buttonText}>CREATE TRIP</Text>
                            </TouchableOpacity>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffa53f',
    },
    container2: {
        paddingTop: 50
    },

    input: {
        height: 50,
        width: 350,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 20,
        paddingHorizontal: 10
    },

    altLoginContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 50
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
        fontSize: 26,
        marginTop: -10,
        marginBottom: 10
    },
    addUsers: {
        backgroundColor: 'rgb(0,25,88)',
        paddingVertical: 5
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 200,
        width: 450,
    },
    innerContainer: {
        backgroundColor: '#fffaf0',
        padding: 20,
        borderRadius: 4,
        borderColor: "#ffa53f"

    }
});