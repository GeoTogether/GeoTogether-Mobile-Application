import React from 'react';
import { ScrollView,Alert, Image, Modal, ActivityIndicator, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import firebase from '../Firebase/firebaseStorage';
import { GoogleSignin } from 'react-native-google-signin';
import LinearGradient from 'react-native-linear-gradient';



export default class Chat extends React.Component {



    constructor(props) {
        super(props)
    }

    // navigation options to be used to navigate the class from other classes

    static navigationOptions = {
        title: 'Chat',
        header: null
    }

    state = {
        email: '',
        password: '',
        authenticating: false,
        user: null,
        error: '',
        name: '',
        trips: [],
        tripsNames: [],
        modalVisible: false,
        UserInvite: '',
        newUser: 2,
    }


    openModal() {
        this.setState({modalVisible:true});
    }

    closeModal() {
        this.setState({modalVisible:false});
    }

    showAlert = () => {
        Alert.alert(
            this.state.UserInvite + ' has been added to the trip'
        )
    }


    componentWillMount() {
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        this.setState({ email: firebase.auth().currentUser.email });
   

        // gets all the user trips
        this.onPressGetTrips();



    }

    componentDidMount(){
        const { navigate } = this.props.navigation;
        const { state } = this.props.navigation;
        this.setState({ email: firebase.auth().currentUser.email });
      


        // gets all the user trips
        this.onPressGetTrips();

    }



    // function to get all the user trips using firebase database
    async onPressGetTrips() {

        // get all the user trips from the firebase database
        firebase.database().ref('trips/').on('value', (snapshot) => {
            snapshot.forEach((tripSnapshot) => {


                const val = tripSnapshot.val();


                if (val.members.indexOf(this.state.email) != -1) {




                    if (this.state.tripsNames.indexOf(val.tripName) == -1) {

                        this.state.trips.push(tripSnapshot);


                        this.setState({ tripsNames: this.state.tripsNames.concat(val.tripName) })

                    }



                }

            })
        })


    }


    render() {
        const { navigate } = this.props.navigation;
        // adding components for all the user trips


        var components = this.state.trips.map((type) =>
            <TouchableOpacity style={styles.tripComponent} onPress={() => navigate('ChatScreen',{tripKey: type, trip: type.val(), email: this.state.email})}>
                <View style={styles.textRow}>
                    <Text style={styles.tripName}>{type.val().tripName}</Text>
                    <Text style={styles.status}>(Open)</Text>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.members}>Members: {type.val().members.length} </Text>
                    <Text style={styles.date}>{type.val().startDate} - {type.val().endDate}</Text>
                </View>
            </TouchableOpacity>);


        return (
            <LinearGradient colors={['#013067', '#00a5a9']} style={styles.linearGradient}>
                <View style={styles.tripContainer}>
                    <ScrollView>
                        <View style={styles.tripView}>
                            {components}
                        </View>
                    </ScrollView>

                </View>







            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tripContainer: {
        height: '75%',
        width: '95%',
        // backgroundColor: 'black',
    },
    tripView:{
        flex: 1,
        //backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tripComponent: {
        backgroundColor: '#fff',
        height: 100,
        width: 340,
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: 'space-between'
    },
    tripName: {
        textAlign: 'left',
        color: '#000',
        fontWeight: 'normal',
        fontSize: 20,
        paddingLeft: 15,
        paddingTop: 10,
    },
    status: {
        textAlign: 'right',
        color: '#000',
        fontWeight: 'normal',
        fontSize: 20,
        paddingRight: 15,
        paddingTop: 35
    },
    textRow:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    date: {
        textAlign: 'right',
        color: '#ffc400',
        fontWeight: 'normal',
        fontSize: 12,
        paddingRight: 15,
        paddingBottom: 10
    },
    members: {
        textAlign: 'left',
        color: '#000',
        fontWeight: 'normal',
        fontSize: 12,
        paddingLeft: 15,
        paddingBottom: 10
    },
    addButtonContainer: {
        //backgroundColor: 'rgb(0,25,88)',
        //flexDirection: 'row'
        position: 'absolute',
        bottom: 0,
        right: 0,
        paddingRight: 10,
        paddingBottom: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
});