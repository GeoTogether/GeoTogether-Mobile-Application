import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    StackNavigator
} from 'react-navigation';
import firebase from '../Firebase/firebaseStorage';






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
        destination: '',
        authenticating: false,
        user: null,
        error: '',
        datastor: '',
        tripname: '',
        members: [],
        member: '',
    }

    componentWillMount() {


    }



    // function to create a new trip using firebase database
    onPressNewTrip() {
        const { navigate } = this.props.navigation;
        const { tripname, destinations, members } = this.state;




        // gets the current user email
        var email = firebase.auth().currentUser.email;
        members.push(email);



        // add the the trip to the database
        firebase.database().ref('trips/').push({
            tripName: tripname,
            admin: email,
            destinations: destinations,
            members: members
        });



        //after adding the trip go back to trips
        navigate('Trips');


    }




    render() {
        const { navigate } = this.props.navigation;



        return (

            <LinearGradient colors={['#00B4AB', '#FE7C00']} style={styles.linearGradient}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.form}>


                        <TextInput
                            placeholder="Trip name"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={tripname => this.setState({ tripname })} // gets the trip name
                            style={styles.input}
                        />

                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder={'Destination ' + (this.state.destinations.length + 1)}
                                returnKeyType="next"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={destination => this.setState({ destination })}
                                style={styles.addinput}
                            />
                            <Text >  </Text>

                            <TouchableOpacity  onPress={() => this.state.destinations.push(this.state.destination)}>
                            <Image
                                style={styles.icon}
                                source={require('../../images/add.png')} />
                            </TouchableOpacity>

                        </View>

                        <Text >  </Text>


                        <View style={{ flexDirection: 'row' }}>

                            <TextInput
                                placeholder={'Trip member ' + (this.state.members.length + 1)}
                                returnKeyType="next"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={member => this.setState({ member })}
                                style={styles.addinput}
                            />
                            <Text >  </Text>

                            <TouchableOpacity  onPress={() => this.state.members.push(this.state.member)}>
                            <Image
                                style={styles.icon}
                                source={require('../../images/add.png')} />
                            </TouchableOpacity>

                        </View>



                        <Text >  </Text>


                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressNewTrip()} >
                            <Text style={styles.buttonText}>Create</Text>
                        </TouchableOpacity>

                        <Text >  </Text>

                        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigate('Trips')}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>


                    </View>

                </KeyboardAvoidingView>

            </LinearGradient>
        )

    }











}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 2
    },
    addinput: {
        height: 50,
        width: 320,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 20,
        paddingHorizontal: 5
    },

    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    buttonContainer: {
        backgroundColor: 'rgb(0,25,88)',
        paddingVertical: 15,
        paddingHorizontal: 1
    },
    input: {
        height: 50,
        width: 400,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    icon: {
        width: 75,
        height: 50
    }

});
