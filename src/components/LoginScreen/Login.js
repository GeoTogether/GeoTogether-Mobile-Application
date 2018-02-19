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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient';
import firebase from '../Firebase/firebaseStorage';
import { GoogleSignin } from 'react-native-google-signin';
import {
    StackNavigator
} from 'react-navigation';
import FBSDK, { LoginManager, AccessToken, GraphRequest,
    GraphRequestManager } from 'react-native-fbsdk';

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
        data: null,
        stored: true,
    }


    //Master Fix

    _fbAuth() {
        const { navigate } = this.props.navigation;

        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then((result) => {
            if (result.isCancelled) {
                alert('Login was cancelled');
            } else {
                //This gives use the user ID and all the permissions.
                //Push this to firebase! and retrieve later
                //console.log(AccessToken.getCurrentAccessToken());
               // alert('Login was successful with permissions: ' + result.grantedPermissions.toString());
            }

            // Retrieve the access token
           return AccessToken.getCurrentAccessToken();
        }).then((data) => {
                // Create a new Firebase credential with the token
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

                //firebase.database().ref('users/').push(data.getPermissions());
                
                // Login with the credential
                //return
                 firebase.auth().signInWithCredential(credential);

                

                 const responseInfoCallback = (error, result) => {
                    if (error) {
                        //console.log(error)
                        alert('Error fetching data: ' + error.toString());
                    } else {


                        this.setState({email : result.email});
                       
                        
                // get all the users from the firebase database
                firebase.database().ref("users").orderByChild("email").equalTo(result.email).once("value", snapshot => {
                    const userData = snapshot.val();
                    if (userData) {
                       // alert("exists!");
                    } else {

                        firebase.database().ref('users/').push({
                            email: result.email,
                            last: result.last_name,
                            first: result.first_name,
                            photo: result.picture.data.url
                        });

                    }
                });

                     
                      
                    }

                    navigate('Trips', { email: this.state.email }) // after login go to trips

                }

                const infoRequest = new GraphRequest('/me', {
                    accessToken: data.accessToken,
                    parameters: {
                        fields: {
                            string: 'email,name,first_name,last_name,picture'
                        }
                    }
                }, responseInfoCallback);

                // Start the graph request.
                new GraphRequestManager().addRequest(infoRequest).start()

               
                
            }).catch((error) => {
                alert('Login failed with error: ' + error);
            });


    }




    componentWillMount() {



    }

    componentDidMount() {
        this.setupGoogleSignin();
    }


    async setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({ autoResolve: true });
            // iosClientId: settings.iOSClientId,
            // webClientId: settings.webClientId,
            await GoogleSignin.configure({
                iosClientId: "271294585129-ipn5069mlbp7tp7jb10t8oqecavsfpm4.apps.googleusercontent.com",
                webClientId: "271294585129-068k74k12h5t40oj4k3sesc3ubp1to19.apps.googleusercontent.com"
            });

            const user = await GoogleSignin.currentUserAsync();

        }
        catch (err) {

        }
    }

    async onPressGoogleSignIn() {

        const { navigate } = this.props.navigation;
        this.setupGoogleSignin();



        GoogleSignin.signIn()
            .then((data) => {
                // Create a new Firebase credential with the token
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);

                // Login with the credential

                firebase.auth().signInWithCredential(credential);
                this.setState({ data: data });
            })
            .then((user) => {
                this.setState({
                    authenticating: false,
                    user: user,
                    error: '',
                });



                // get all the users from the firebase database
                firebase.database().ref("users").orderByChild("email").equalTo(this.state.data.email).once("value", snapshot => {
                    const userData = snapshot.val();
                    if (userData) {
                        // alert("exists!");
                    } else {

                        firebase.database().ref('users/').push({
                            email: this.state.data.email,
                            last: this.state.data.familyName,
                            first: this.state.data.givenName,
                            photo: this.state.data.photo
                        });

                    }
                });






                navigate('Trips', { email: this.state.data.email });


            })
            .catch((error) => {
                alert('Login failed with error: ' + error);

            });



    }

    // function to sign in the user using firebase authentication
    onPressSignIn() {

        const { navigate } = this.props.navigation;

        this.setState({
            authenticating: true,
        });

        const { email, password } = this.state; // gets the user email and password


        if (email == '' || password == '') {

            alert('Login failed Please enter a valid email and password');

        } else {

            // call firebase authentication and checks the email and password
            firebase.auth().signInWithEmailAndPassword(email, password).then(user => this.setState({ // if the user email and password did  match what firebase
                authenticating: false,
                user: user,
                error: '',
            })).catch((error) => {
                alert('Login failed with error: ' + error);

            });

        }






    }



    render() {


        const { navigate } = this.props.navigation;

        if (firebase.auth().currentUser !== null) {
            return (
                navigate('Trips', { email: firebase.auth().currentUser.email }) // after login go to trips
            )
        }

        return (

            <LinearGradient colors={['#00B4AB', '#FE7C00']} style={styles.linearGradient}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../images/geotogether.png')}
                    />
                </View>

                <View style={styles.loginFieldContainer}>

                    <TextInput
                        placeholder="Email"
                        underlineColorAndroid="transparent"
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={email => this.setState({ email })}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="Password"
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        returnKeyType="go"
                        secureTextEntry
                        style={styles.input}
                        onChangeText={password => this.setState({ password })}
                    />

                    <Text style={styles.forgotPasswordTxt} onPress={() => navigate('PasswordReset')}>Forgot Your
                        Password?</Text>

                </View>

                <View style={styles.loginBContainer}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.onPressSignIn()}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.altLoginContainer}>
                    <TouchableOpacity onPress={() => this._fbAuth()} style={styles.altBStyle}>
                        <Image
                            style={styles.icon}
                            source={require('../../images/facebook.png')}
                        />
                    </TouchableOpacity>
                    <Text> </Text>
                    <TouchableOpacity onPress={this.onPressGoogleSignIn.bind(this)} style={styles.altBStyle}>
                        <Image
                            style={styles.icon}
                            source={require('../../images/google.png')} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

        )
    }

}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoContainer: {
        flex: 3,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    logo: {
        width: 250,
        height: 250
    },
    loginFieldContainer:{
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        width: 300,
        height: 50,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10
    },
    forgotPasswordTxt: {
        textAlign: 'center',
        color: 'rgb(0,25,88)',
        fontWeight: '100'
    },
    loginBContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'red',
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 100,
        shadowRadius: 50,
        elevation: 1
    },
    buttonStyle: {
        backgroundColor: 'rgb(0,25,88)',
        width: 300,
        height: 45,
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '100'
    },
    altLoginContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    altBStyle:{
        margin: '8%'
    },
    icon: {
        width: 50,
        height: 50
    }


});
