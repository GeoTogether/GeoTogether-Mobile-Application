import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View,  KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import firebase from './firebaseStorage';






export default class PasswordReset extends React.Component {

    constructor(props) {
        super(props)
    }

  // navigation options to be used to navigate the class from other classes

    static navigationOptions = {
        title: 'PasswordReset',
        header: null
    }
  // the user state with all of the user information 
    state = {
        email: '',
        error: '',
   
    }

    componentWillMount() {
      

    }

// function to Reset the user password using firebase authentication
    onPressPasswordReset(){
        const { email} = this.state;
        const { navigate } = this.props.navigation;


            firebase.auth().sendPasswordResetEmail(email).then(function() {
                // Email sent.
              }).catch(function(error) {
                // An error happened.
                this.setState({ error: 'Failed'});
              });
              

              if (this.state.error == ''){
                navigate('Login'); // go back to login
            }


    }





    render() {
        const { navigate } = this.props.navigation;

        return (

            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.Container}>
         
            <TextInput
            placeholder="Email"
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={email => this.setState({ email })}
            style={styles.input}
          />

          <TouchableOpacity onPress={() => this.onPressPasswordReset()} style={styles.buttonContainer} >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('Login')} style={styles.buttonContainer} >
            <Text style={styles.buttonText}>Cancel</Text>
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
        paddingVertical: 15
      },
    
      buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
      },
  });
