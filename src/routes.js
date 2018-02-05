
import React, { Component } from 'react';

import {
    StackNavigator
} from 'react-navigation';

//importing the the classes
import Login from './components/LoginScreen/Login';
import SignUp from './components/SignUpScreen/SignUp';
import Trips from './components/TripsScreen/Trips';
import NewTrip from './components/NewTripScreen/NewTrip';
import PasswordReset from './components/PasswordResetScreen/PasswordReset';
import SplashScreen from './components/SplashScreen/SplashScreen';

// adding all the classes ti navigator
const Home = StackNavigator({
        SplashScreen: {screen: SplashScreen},
        Login: { screen: Login },
        SignUp:{screen: SignUp},
        Trips:{screen: Trips},
        PasswordReset:{screen: PasswordReset},
        NewTrip:{screen: NewTrip},
    },
    {headerMode: 'screen'});

export default Home;
