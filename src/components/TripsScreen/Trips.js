import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import {
  StackNavigator
} from 'react-navigation';
import firebase from '../Firebase/firebaseStorage';
import { GoogleSignin } from 'react-native-google-signin';
import LinearGradient from 'react-native-linear-gradient';
import ActionBar from 'react-native-action-bar';



export default class Trips extends React.Component {



  constructor(props) {
    super(props)
  }

  // navigation options to be used to navigate the class from other classes

  static navigationOptions = {
    title: 'Trips',
    header: null
  }
  // the user state with all of the user information 
  state = {
    email: '',
    password: '',
    authenticating: false,
    user: null,
    error: '',
    datastor: '',
    name: '',
    trips: [],
    tripsNames: [],
    selectedcity: '',
  }






  componentWillMount() {

    // gets all the user trips 
    //  this.onPressGetTrips();



  }


  // funcation to sign out using firebase authentication.

  onPressLogOut() {
    const { navigate } = this.props.navigation;



      firebase.auth().signOut()
        .then(() => {
          this.setState({
            email: '',
            password: '',
            authenticating: false,
            user: null,
          })
          navigate('Login') // after login go to trips

        }, error => {
          console.error('Sign Out Error', error);
        });

        GoogleSignin.signOut();
    




  }



  // function to get all the user trips using firebase database
  onPressGetTrips() {

    // gets the current user email
    var email = firebase.auth().currentUser.email;

    var encod = email.replace(".", ",");

    var tripslist = [];

    // get all the user trips from the firebase database
    firebase.database().ref('trips/').on('value', (snapshot) => {
      snapshot.forEach((tripSnapshot) => {


        const val = tripSnapshot.val();


        if (val.members.indexOf(email) != -1) {




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

 

    return (
      
      <LinearGradient colors={['#00B4AB', '#FE7C00']} style={styles.linearGradient}>
        <ActionBar
                    containerStyle={styles.bar}
                    title={'Hello '}
                    leftIconImage ={require('../../images/add.png')}
                    leftBadge={''}
                    onLeftPress={() => console.log('Left!')}
                    onTitlePress={() => console.log('Title!')}
                    rightIcons={[
                      {
                          name: 'add',
                          badge: '0',
                          onPress: () => navigate('NewTrip'),
                      }
                  ]}
                />
       
        <KeyboardAvoidingView behavior="padding" style={styles.container}>

          <View style={styles.Container}>
        


            <Text >  </Text>

            <TouchableOpacity onPress={() => this.onPressLogOut()} style={styles.buttonContainer} >
              <Text style={styles.buttonText}>Log Out</Text>
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
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: 2
  },
  buttonContainer: {
    backgroundColor: 'rgb(0,25,88)',
    paddingVertical: 15,
    paddingHorizontal: 80
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  bar:{
    backgroundColor:'rgb(0,25,88)',
    height: 50,
    width: 418,
    paddingLeft: 10,
    paddingRight: 10,
    
    
  },

});