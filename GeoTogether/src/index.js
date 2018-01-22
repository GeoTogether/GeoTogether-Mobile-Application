
import React, { Component } from 'react';

import {
    StackNavigator
} from 'react-navigation';

//importing the the classes
import Login from './Login';
import SignUp from './SignUp';
import Trips from './Trips';
import PasswordReset from './PasswordReset';
import SplashScreen from './SplashScreen';

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
