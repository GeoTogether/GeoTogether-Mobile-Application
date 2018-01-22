import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    Image,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firebase from './firebaseStorage';
import {
    StackNavigator
} from 'react-navigation';


export default class Login extends React.Component {

    constructor(props) {
        super(props)

    }


    // navigation options to be used to navigate the class from other classes

    static navigationOptions = {
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
    }


    componentWillMount() {


    }


    // function to sign in the user using firebase authentication
    onPressSignIn() {

        const {navigate} = this.props.navigation;

        this.setState({
            authenticating: true,
        });

        const {email, password} = this.state; // gets the user email and password


        // call firebase authentication and checks the email and password
        firebase.auth().signInWithEmailAndPassword(email, password).then(user => this.setState({ // if the user email and password did  match what firebase
            authenticating: false,
            user,
            error: '',
        })).catch(() => this.setState({ // if the user email and password did not match what firebase have set failure
            authenticating: false,
            user: null,
            error: 'Authentication Failure',
        }))


        var encod = email.replace(".", ",");

        // gets the user name from firebase database
        firebase.database().ref('users/').child(encod).child('username').on('value', (snapshot) => {

            this.setState({datastor: snapshot.val()})

        })


    }

    renderCurrentState() {


        const {navigate} = this.props.navigation;


        if (firebase.auth().currentUser !== null) {
            return (
                navigate('Trips') // after login go to trips
            )
        }

        return (

            <LinearGradient colors={['#00B4AB', '#FE7C00']} style={styles.linearGradient}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('./images/geotogether.png')}/>
                </View>

                <View style={styles.container2}>

                    <TextInput
                        placeholder="email"
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={email => this.setState({email})}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="password"
                        returnKeyType="go"
                        secureTextEntry
                        style={styles.input}
                        onChangeText={password => this.setState({password})}
                    />

                    <Text style={styles.splitText} onPress={() => navigate('PasswordReset')}>Forgot Your
                        Password?</Text>

                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressSignIn()}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>

                </View>

                <Text>----------------OR----------------</Text>

                <View style={styles.altLoginContainer}>
                    <Image
                        style={styles.icon}
                        source={require('./images/facebook.png')}
                    />
                    <Text> </Text>
                    <Image
                        style={styles.icon}
                        source={require('./images/google.png')}/>
                </View>


            </KeyboardAvoidingView>

            </LinearGradient>

        )


    }


    render() {
        return (
            <View style={styles.container}>
                {this.renderCurrentState()}
            </View>
        );
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
    altLoginContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 50
    },

    splitContainer: {
        marginBottom: 20,
    },

    splitText: {
        textAlign: 'center',
        color: 'rgb(0,25,88)',
        fontWeight: '700'
    },

    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },

    logo: {
        marginTop: 20,
        width: 300,
        height: 300
    },

    icon: {
        width: 75,
        height: 75
    },

    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 2
    },
    container2: {
        padding: -10,
        marginBottom: 20,
        marginTop: 20
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
