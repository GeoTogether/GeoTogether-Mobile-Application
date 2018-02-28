import React from 'react';
import { ScrollView,Alert, Image, Modal, ActivityIndicator, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {
  StackNavigator,
    TabNavigator
} from 'react-navigation';
import firebase from '../Firebase/firebaseStorage';
import { GoogleSignin } from 'react-native-google-signin';
import LinearGradient from 'react-native-linear-gradient';

import NewTrip from "../NewTripScreen/NewTrip";


class Trips extends React.Component {

  constructor(props) {
    super(props)
  }

  // navigation options to be used to navigate the class from other classes

  static navigationOptions = {
    title: 'Trips',
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
    this.setState({ email: state.params.email });
    this.checkNewUser();
   
    // gets all the user trips 
     this.onPressGetTrips();



  }

  componentDidMount(){
    const { navigate } = this.props.navigation;
    const { state } = this.props.navigation;
    this.setState({ email: state.params.email });
    this.checkNewUser();
    
        

    // gets all the user trips 
     this.onPressGetTrips();

  }

  // funcation to sign out using firebase authentication.

  onPressLogOut() {
    const { navigate } = this.props.navigation;



    if (firebase.auth().currentUser !== null) {

      firebase.auth().signOut()
        .then(() => {
          this.setState({
            email: '',
            password: '',
            authenticating: false,
            user: null,
          })
          navigate('SplashScreen') // after login go to trips

        }, error => {
          console.error('Sign Out Error', error);
        });

    }




  }

  async checkNewUser(){
    const { navigate } = this.props.navigation;
    
    firebase.database().ref('users/').on('value', (snapshot) => {
        snapshot.forEach((userSnapshot) => {


            const val = userSnapshot.val();
           


            if (val.email == this.state.email) {


               if(val.newUser == 1){

                this.setState({newUser : 1});

                firebase.database().ref('users/').child(userSnapshot.key).set({ first: val.first,
                    last: val.last,
                    email: val.email,
                    photo: val.photo,
                    newUser: 2,
                       }
                )

                navigate('Intro', { email: this.state.email });

            }


            }

        })
    })


  }


  // function to get all the user trips using firebase database
  async onPressGetTrips() {

    // get all the user trips from the firebase database
    firebase.database().ref('trips/').on('value', (snapshot) => {
      snapshot.forEach((tripSnapshot) => {


        const val = tripSnapshot.val();


        if (val.members.indexOf(this.state.email) != -1) {




          if (this.state.tripsNames.indexOf(val.tripName) == -1) {

            this.state.trips.push(val);


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
        <TouchableOpacity style={styles.tripComponent} onPress={() => navigate('GMapView',{trip: type, email: this.state.email})}>
            <View style={styles.textRow}>
                <Text style={styles.tripName}>{type.tripName}</Text>
                <Text style={styles.status}>(Open)</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={styles.members}>Members: {type.members.length} </Text>
                <Text style={styles.date}>{type.startDate} - {type.endDate}</Text>
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
            <View style={styles.addButtonContainer}>
                <TouchableOpacity onPress={() => navigate('NewTrip', {email: this.state.email})}>
                    <Image
                        source={require('../../images/addbutton.png')}
                    />
                </TouchableOpacity>

                
            </View>

     

            


        </LinearGradient>
    );
  }
}

export default TabNavigator({
    Home: {screen: Trips},
    AddTrip: {screen: NewTrip}
});



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