import React from 'react';
import {
    StyleSheet, View, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    StackNavigator
} from 'react-navigation';
import firebase from '../Firebase/firebaseStorage';
import DatePicker from 'react-native-datepicker';






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
        endDate : null,
        email : '',
    }

    componentWillMount() {

        const { state } = this.props.navigation;
        this.setState({email: state.params.email});

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
            endDate : endDate,
            destinations: destinations,
            members: members
        });



        //after adding the trip go back to trips
        navigate('Trips',{email: this.state.email});


    }




    render() {
        const { navigate } = this.props.navigation;



        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.formContainer}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={styles.container2}>

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
                                style={{width: 200,  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                marginBottom: 20,
                                paddingHorizontal: 10}}
                                date={this.state.startDate}
                                showIcon ={false}
                                mode="date"
                                placeholder="Start Date"
                                format="YYYY-MM-DD"
                                customStyles={styles.durationInput}
                                onDateChange={(startdate) => { this.setState({ startDate: startdate }), this.placeholder = startdate }}
                            />
                           

                           <DatePicker
                                style={{width: 200,  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                marginBottom: 20,
                                paddingHorizontal: 10}}
                                date={this.state.endDate}
                                showIcon ={false}
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

                            <TouchableOpacity>
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
});