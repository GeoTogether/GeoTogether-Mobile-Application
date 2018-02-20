import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
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
              newUser: 'true',
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

            <TextInput
            placeholder="First Name"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={fname => this.setState({ fname })}
            style={styles.input}
          />

<TextInput
            placeholder="Last Name"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={lname => this.setState({ lname })}
            style={styles.input}
          />

          <TextInput
            placeholder="email"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={email => this.setState({ email })}
            style={styles.input}
          />

          <TextInput
            placeholder="password"
            secureTextEntry
            style={styles.input}
            onChangeText={password => this.setState({ password })}
          />

          <TouchableOpacity onPress={() => this.onPressSignUp()} style={styles.buttonContainer} >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('Login')} style={styles.buttonContainer} >
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
  }

});
