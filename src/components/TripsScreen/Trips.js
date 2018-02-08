import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import firebase from '../Firebase/firebaseStorage';
import { GoogleSignin} from 'react-native-google-signin';



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



      if (firebase.auth().currentUser !== null) {

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
      
    }


    

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


            if(val.members.indexOf(email)!=-1){


                      

            if(this.state.tripsNames.indexOf(val.tripName)==-1){
                
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
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

            <View style={styles.Container}>
         

          <TouchableOpacity onPress={() => this.onPressLogOut()} style={styles.buttonContainer} >
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
         
        </View>
        </KeyboardAvoidingView>
        )

    }











}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffa53f',
    },
  
    altLoginContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    input: {
        height: 50,
        width: 350,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 20,
        paddingHorizontal: 10
      },
    
      buttonContainer: {
        backgroundColor: 'rgb(0,25,88)',
        paddingVertical: 15,
        paddingHorizontal: 50
      },
    
      buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
      },
  });