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
import {
    StackNavigator
} from 'react-navigation';
import Login from '../LoginScreen/Login';
import SplashScreen from '../SplashScreen/SplashScreen';
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
    };
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
    };

    componentWillMount() {

    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    validatePassword = (password) => {
        var reg = /(?=.*[A-Z])(?=.*[0-9])[#@£$-/:-?{-~!"^_`\[\]a-zA-Z0-9]{8,}/;
        return reg.test(password);
    };

// function to sign up the user using firebase authentication
    onPressSignUp() {
        const {email, password, fname, lname} = this.state;
        const {navigate} = this.props.navigation;

        if(fname == '') {
            alert("Please enter your full name");
        } else {
            if (!this.validateEmail(email)) {
                alert("Please enter a valid email");
            } else {
                if (!this.validatePassword(password)) {
                    alert("Please enter a password with at least 8 characters, one uppercase letter, and one number");
                } else {
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
                    }));

                    // add the user to the database
                    firebase.database().ref('users/').push({
                        first: fname,
                        last: lname,
                        email: email,
                        photo: '',
                        newUser: 1,
                    });


                    // if the register is success
                    if (this.state.error == '') {
                        navigate('Login'); // go back to login
                    }
                }

            }
        }


    }


    render() {
        const {navigate} = this.props.navigation;

        return (
            <LinearGradient colors={['#00B4AB', '#FE7C00']} style={styles.linearGradient}>
                {/*<KeyboardAvoidingView behavior="padding" style={styles.container}>*/}
                {/*<View style={styles.Container}>*/}
                <View style={styles.backArrowContainer}>
                    <View style={styles.backArrowStyle}>
                        <TouchableOpacity onPress={() => navigate('SplashScreen')}>
                            <Image
                                style={styles.arrowStyle}
                                source={require('../../images/backarrow.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.logoContainer}>
                    <View style={styles.logoStyle}>
                        <Image
                            style={styles.logo}
                            source={require('../../images/geotogetherlogo.png')}
                        />
                    </View>
                </View>
                <View style={styles.fNameContainer}>
                    <TextInput
                        placeholder="Full name"
                        underlineColorAndroid="transparent"
                        returnKeyType="next"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={fname => this.setState({fname})}
                        style={styles.fullNameStyle}
                    />
                </View>
                <View style={styles.emailContainer}>
                    <TextInput
                        placeholder="Email Address"
                        underlineColorAndroid="transparent"
                        returnKeyType="next"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={email => this.setState({email})}
                        style={styles.emailStyle}
                    />
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="Password"
                        underlineColorAndroid="transparent"
                        secureTextEntry
                        style={styles.passwordStyle}
                        onChangeText={password => this.setState({password})}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonStyle}>
                        <TouchableOpacity onPress={() => this.onPressSignUp()}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        )
    }
}


const styles = StyleSheet.create({
    linearGradient: {
        flex: 1
    },
    backArrowContainer: {
        height: '15%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        marginTop: 5
    },
    backArrowStyle: {
        width: '90%',
        height: '80%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    arrowStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '-15%'
    },
    logoStyle: {
        width: '70%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    fNameContainer: {
        width: '100%',
        height: '11%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2%'
    },
    fullNameStyle: {
        height: '100%',
        width: '90%',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    emailContainer: {
        width: '100%',
        height: '11%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2%'
    },
    emailStyle: {
        height: '100%',
        width: '90%',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    passwordContainer: {
        width: '100%',
        height: '11%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2%'
    },
    passwordStyle: {
        height: '100%',
        width: '90%',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10
    },
    buttonContainer: {
        height: '13%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%'
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0,25,88)',
        borderRadius: 9,
        width: '80%',
        height: '60%'
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '100',
        fontSize: 15
    },
});
