
import React, { Component } from 'react';

import {
    StackNavigator
} from 'react-navigation';

//importing the the classes
import Login from './LoginScreen/Login';
import SignUp from './SignUpScreen/SignUp';
import Trips from '../Trips';
import PasswordReset from './LoginScreen/PasswordReset';
import SplashScreen from './SplashScreen/SplashScreen';

// adding all the classes ti navigator 
const Home = StackNavigator({
   SplashScreen: {screen: SplashScreen},
   Login: { screen: Login },
   SignUp:{screen: SignUp},
   Trips:{screen: Trips},
   PasswordReset:{screen: PasswordReset},
},
{headerMode: 'screen'});

export default Home;
