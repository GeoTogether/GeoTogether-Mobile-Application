import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import {
    StackNavigator
} from 'react-navigation';
import Login from '../LoginScreen/Login';
import firebase from '../Firebase/firebaseStorage';
import LinearGradient from 'react-native-linear-gradient';






export default class SignUp extends React.Component {

    constructor(props) {
        super(props)
    }

  // navigation options to be used to navigate the class from other classes

    static navigationOptions = {
        title: 'SignUp',
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
        fname: '',
        lname: '',
    }

    componentWillMount() {


    }

// function to sign up the user using firebase authentication
    onPressSignUp(){
        const { email, password, fname, lname } = this.state;
        const { navigate } = this.props.navigation;

        // add the user email and password to firebase 
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => this.setState({
              authenticating: false,
              user,
              error: '',
            })).catch(() => this.setState({
              authenticating: false,
              user: null,
              error: 'Sign Up Failure',
            }))

            // add the user to the database
            firebase.database().ref('users/').push({
              first: fname,
              last: lname,
              email: email,
              photo: '',
              newUser: 1,
            });


         // if the register is success
            if (this.state.error == ''){
                navigate('Login'); // go back to login
            }


    }





    render() {
        const { navigate } = this.props.navigation;

        return (
            <LinearGradient colors={['#00B4AB', '#FE7C00']} style={styles.linearGradient}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.Container}>
                <View>
                <TouchableOpacity onPress={() => navigate('Login')} style={styles.back} >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../images/geotogether.png')}
                    />
                </View>
            <TextInput
            placeholder="Full name"
            underlineColorAndroid="transparent"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={fname => this.setState({ fname })}
            style={styles.input}
          />



          <TextInput
            placeholder="Email Address"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={email => this.setState({ email })}
            style={styles.input2}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input3}
            onChangeText={password => this.setState({ password })}
          />

          <TouchableOpacity onPress={() => this.onPressSignUp()} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(0,25,88)',
              borderRadius: 10,
              marginBottom: 125
             }} >
            <Text style={styles.buttonText}>Sign Up</Text>
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
  logo: {
      width: 250,
      height: 250
  },
  logoContainer: {
      marginTop: 5,
      flex: 3,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
  },
  back: {
    marginRight: 300,
    marginTop: 5,
  },
  linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 2
  },

  buttonText: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontWeight: '700',
      paddingTop: 10,
      paddingBottom: 10,
  },
  buttonContainer: {
      backgroundColor: 'rgb(0,25,88)',
      borderRadius: 10,
      width: 300,
      height: 45,
      marginBottom: 20,


      paddingHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',



  },
  input: {
      height: 50,
      width: 350,
      marginBottom: 10,


      alignItems: 'stretch',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      borderRadius: 10,
  },
  input2: {
      height: 50,
      width: 350,
      marginBottom: 10,

      alignItems: 'stretch',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      borderRadius: 10,
  },
  input3: {
      height: 50,
      width: 350,
      marginBottom: 40,
      paddingHorizontal: 10,
      alignItems: 'stretch',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      borderRadius: 10,
  }


});
